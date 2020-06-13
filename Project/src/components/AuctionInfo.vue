<template>
  <div class="auction-info">
      <tr><th>Name: </th><td>{{ auction.name }}</td></tr>
      <tr><th>User: </th><td>{{ auction.username }}</td></tr>
      <tr><th>Description: </th><td>{{ auction.description }}</td></tr>
      <tr><th>Price: </th><td>{{ auction.price }}</td></tr>
      <div v-if="auction.type === 'BID'">
        <tr><th>Due date: </th><td>{{ this.convertToDate(auction.date) }}</td></tr>
        <div v-if="auction.status === 'ONGOING'">
          <div v-if="isValidBidder">
            <tr><th><button @click="bid()">Bid</button></th>
            <td><input v-model="price" type="number" min="1" step="1" placeholder="Your bid" size="9" ></td></tr>
          </div>
          <tr><th>Highest bidder: </th><td>{{ auction.highest_bidder }}</td></tr>
        </div>
        <div v-else-if="auction.status === 'SOLD'">
          <tr><th>Bought for: </th><td>{{ auction.price }}</td></tr>
          <tr><th>Successful bidder: </th><td>{{ auction.highest_bidder }}</td></tr>
        </div>
      </div>
      <div v-else-if="auction.type === 'BUY'">
        <div v-if="auction.status === 'ONGOING'">
          <div v-if="isValidBidder">
            <tr><td><button @click="buy()">Buy</button></td></tr>
          </div>
        </div>
        <div v-else-if="auction.status === 'SOLD'">
          <tr><th>Bought for: </th><td> ${{ auction.price }}</td></tr>
          <tr><th>Buyer: </th><td> ${{ auction.highest_bidder }}</td></tr>
        </div>
      </div>
  </div>
</template>

<script>
import moment from "moment";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "AuctionInfo",
  computed: {
    ...mapGetters(["user", "isAuthenticated"]),
    isValidBidder: function () {
      return this.user.username !== this.auction.username && this.isAuthenticated;
    }
  },
  props: ["auction", "emitter"],
  data () {
    return {
      id: this.auction._id,
      price: ""
    };
  },
  methods: {
    ...mapActions(["logError"]),
    buy () {
      this.emitter.emit("new_buy", {
        _id: this.auction._id,
        highest_bidder: this.user.username,
        status: "SOLD"
      });
    },
    bid () {
      if (this.price <= this.auction.price) {
        console.log("Pay more plz");
      } else {
        this.emitter.emit("new_bid", {
          _id: this.auction._id,
          highest_bidder: this.user.username,
          price: this.price
        });
      }
    },
    convertToDate (string) {
      const date = moment(string).format("YYYY-MM-DD");
      return date;
    }
  }
};
</script>

<style lang="scss" scoped>
tr {
  text-align: left;
  td {
    text-align: left;
    word-break: break-all;
  }
  th {
    text-align: left;
  }
}
</style>
