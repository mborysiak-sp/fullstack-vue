<template>
  <div class="auction-edit-form" v-if="auction != null" >
    <form>
      <input v-model="auction.name" id="name" type="text" minlength="2" placeholder="Name">
      <input v-model="auction.price" id="price" type="number" min="1" step="1" placeholder="Price">
      <select v-model="auction.type" id="select" name ="select">
        <option value="BID">BID</option>
        <option value="BUY">BUY</option>
      </select>
      <div v-if="type === 'BID'">
        <input type="number" v-model="auction.duration" placeholder="Duration">
      </div>
      <input type="button" @click="edit" value="Edit">
    </form>
  </div>
</template>

<script>
import axios from "axios";
import { mapActions } from 'vuex';

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
        duration: this.inheritedAuction.duration,
        type: this.inheritedAuction.type
      }
    };
  },
  methods: {
    ...mapActions(["logError"]),
    edit () {
      axios
        .patch("/api/auction", this.auction)
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
