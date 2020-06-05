<template>
  <div class="auction-info">
    <br>
    Name: {{ auction.name }}
    User: {{ auction.username }}
    <div v-if="auction.type === 'BID'">
      <div v-if="auction.status === 'ONGOING'">
          Price: {{ auction.price }}
          Highest bidder: {{ auction.highest_bidder }}
        <div v-if="isValidBidder">
          <button @click="bid()">Bid</button>
          <input v-model="price" type="number" min="1" step="1" placeholder="Your bid" size="9" >
        </div>
      </div>
      <div v-else-if="auction.status === 'SOLD'">
        Bought for: {{ auction.price }}
        Successful bidder: {{ auction.highest_bidder }}
      </div>
    </div>
    <div v-else-if="auction.type === 'BUY'">
      <div v-if="auction.status === 'ONGOING'">
          Price: ${{ auction.price }}
        <div v-if="isValidBidder">
          <button @click="buy()">Buy</button>
        </div>
      </div>
      <div v-else-if="auction.status === 'SOLD'">
        Bought for: ${{ auction.price }}
        Buyer: ${{ auction.highest_bidder }}
      </div>
    </div>
    <div v-if="isValidStarter">
      Starting price: ${{ auction.price }}
      <button @click="start()">Start</button>
    </div>
    <br>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import axios from "axios";

export default {
  name: "AuctionInfo",
  computed: {
    ...mapGetters(["user", "isAuthenticated"]),
    isValidBidder: function () {
      return this.user.username !== this.auction.username && this.isAuthenticated;
    },
    isValidStarter: function () {
      return this.user.username === this.auction.username && this.isAuthenticated && this.auction.status === "NEW";
    }
  },
  props: ["auction", "socket"],
  data () {
    return {
      id: this.auction._id,
      price: ""
    };
  },
  methods: {
    ...mapActions(["logError"]),
    start () {
      axios
        .patch(
          "/api/start",
          { _id: this.auction._id }, { withCredentials: true })
        .then(() => {
          location.reload();
        })
        .catch((error) => {
          this.logError(error);
        });
    },
    buy () {
      this.socket.emit("new_buy", {
        _id: this.auction._id,
        highest_bidder: this.user.username,
        status: "SOLD"
      });
    },
    bid () {
      if (this.price <= this.auction.price) {
        console.log("Pay more plz");
      } else {
        this.socket.emit("new_bid", {
          _id: this.auction._id,
          highest_bidder: this.user.username,
          price: this.price
        });
      }
    }
  }
};
</script>

<style>

</style>
