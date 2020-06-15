<template>
  <div class="auction-info">
    <div class="container">
      <div class="element"><span>Name:</span> {{ auction.name }}</div>
      <div class="element"><span>User:</span> {{ auction.username }}</div>
      <div class="element"><span>Description:</span> {{ auction.description }}</div>
      <div v-if="auction.status === 'ONGOING' || auction.status === 'NEW'">
        <div class="element"><span>Current price:</span> {{ auction.price }}</div>
      </div>
      <div v-if="auction.type === 'BID'">
        <div class="element"><span>Due date:</span> {{ this.convertToDate(auction.date) }}</div>
        <div class="element"><span>Highest bidder:</span> {{ auction.highest_bidder }}</div>
      </div>
      <div v-if="auction.status === 'SOLD'">
        <div class="element"><span>Bought for:</span> {{ auction.price }}</div>
        <div class="element"><span>Buyer:</span> {{ auction.highest_bidder }}</div>
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
    display: flex;
    word-break: break-all;
    flex-flow: column wrap;
    justify-content: space-between;
    span {
      font-weight: bold;
      text-align: left;
      color: rgb(0, 0, 0);
      text-shadow: rgb(122, 122, 122) 4px 3px 0px;
    }
  }
}
</style>
