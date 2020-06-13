<template>
  <div class="auction-info">
    <div class="container">
      <div class="element">Name: {{ auction.name }}</div>
      <div class="element">User: {{ auction.username }}</div>
      <div class="element">Description: {{ auction.description }}</div>
      <div v-if="auction.status === 'ONGOING' || auction.status === 'NEW'">
        <div class="element">Current price: {{ auction.price }}</div>
      </div>
      <div v-if="auction.type === 'BID'">
        <div class="element">Due date: {{ this.convertToDate(auction.date) }}</div>
        <div class="element">Highest bidder: {{ auction.highest_bidder }}</div>
      </div>
      <div v-if="auction.status === 'SOLD'">
        <div class="element">Bought for: {{ auction.price }}</div>
        <div class="element">Buyer: {{ auction.highest_bidder }}</div>
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
  props: ["auction"],
  data () {
    return {
      id: this.auction._id,
      price: ""
    };
  },
  methods: {
    ...mapActions(["logError"]),
    convertToDate (string) {
      const date = moment(string).format("YYYY-MM-DD");
      return date;
    }
  }
};
</script>

<style lang="scss" scoped>
.auction-info {
  .container {
    text-align: center;
    display: flex;
    flex-flow: column wrap;
    justify-content: space-evenly;
  }
}
</style>
