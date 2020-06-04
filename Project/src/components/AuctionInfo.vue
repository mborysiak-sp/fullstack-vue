<template>
  <div class="auction-info">
    <div v-if="auction.type === 'BID'">
      <div v-if="auction.status === 'ONGOING'">
          Price: ${{ auction.price }}
          Highest bidder: {{ auction.highest_bidder }}
        <div v-if="isValidBidder">
          <button @click="bid()" value="Bid" />
          <input v-model="price" type="number" min="1" step="1" placeholder="Your bid" size="9" >
        </div>
      </div>
      <div v-else-if="auction.status === 'SOLD'">
        Bought for: ${{ auction.price }}
        Successful bidder: ${{ auction.highest_bidder }}
      </div>
      <div v-else-if="auction.status === 'NEW' && auction.user === user.username">
        Minimum price: ${{ auction.price }}
        <button @click="start()" value="Start" />
      </div>
    </div>
    <div v-else>
      <div v-if="auction.status === 'ONGOING'">
          Price: ${{ auction.price }}
          Highest bidder: {{ auction.highest_bidder }}
        <div v-if="isValidBidder">
          <button @click="bid()" value="Buy"/>
          <input v-model="price" type="number" min="1" step="1" placeholder="Your bid" size="9" >
        </div>
      </div>
      <div v-else-if="auction.status === 'SOLD'">
        Bought for: ${{ auction.price }}
        Buyer: ${{ auction.highest_bidder }}
      </div>
      <div v-else-if="auction.status === 'NEW' && user.username === auction.username">
        Price: ${{ auction.price }}
        <button @click="start()" value="Start" />
      </div>
    </div>
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
    }
  },
  props: ["auction"],
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
          { index: this.auction._id }, { withCredentials: true })
        .then(() => {
          location.reload();
        })
        .catch((error) => {
          this.logError(error);
        });
    },
    bid () {
      if (this.price <= this.auction.price) {
        console.log("Pay more plz");
      } else {
        // to do
        console.log("Biddedeed");
      }
    }
  }
};
</script>

<style>

</style>
