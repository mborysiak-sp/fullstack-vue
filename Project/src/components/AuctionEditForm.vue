<template>
  <div class="auction-edit-form" v-if="auction !== null" >
    <form>
      <input v-model="auction.name" id="name" type="text" minlength="2" placeholder="Name">
      <input v-model="auction.price" id="price" type="number" min="1" step="1" placeholder="Price">
      <input v-model="auction.description" id="description" type="text" placeholder="Description">
      <select v-model="auction.type" id="select" name ="select">
        <option value="BID">BID</option>
        <option value="BUY">BUY</option>
      </select>
      <div v-if="auction.type === 'BID'">
        <input type="number" v-model="auction.time" placeholder="time">
      </div>
      <input type="button" @click="put()" value="Edit">
    </form>
  </div>
</template>

<script>
import axios from "axios";
import { mapActions } from "vuex";

export default {
  name: "AuctionEditForm",
  props: ["user", "inheritedAuction"],
  data () {
    return {
      auction: {
        id: this.inheritedAuction._id,
        username: this.inheritedAuction.username,
        name: this.inheritedAuction.name,
        price: this.inheritedAuction.price,
        time: this.inheritedAuction.time,
        description: this.inheritedAuction.description,
        status: this.inheritedAuction.status,
        type: this.inheritedAuction.type,
        bidders: this.inheritedAuction.bidders,
        highest_bidder: this.inheritedAuction.highest_bidder
      }
    };
  },
  methods: {
    ...mapActions(["logError"]),
    put () {
      const auction = {
        _id: this.auction.id,
        name: this.auction.name,
        price: this.auction.price,
        type: this.auction.type,
        username: this.auction.username,
        status: this.auction.status,
        description: this.auction.description,
        time: this.auction.time,
        bidders: this.auction.bidders,
        highest_bidder: this.auction.highest_bidder
      };
      axios
        .put("/api/auction", auction, { withCredentials: true })
        .then(() => {
          location.reload();
        })
        .catch((error) => {
          this.logError(error);
        });
    }
  }
};
</script>

<style>

</style>
