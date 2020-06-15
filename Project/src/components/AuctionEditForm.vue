<template>
  <div class="auction-edit-form" v-if="auction !== null" >
    <form>
      <div class="element">
        <label>Name:</label>
        <input v-model="auction.name" id="name" type="text" minlength="2" placeholder="Name">
      </div>
      <div class="element">
        <label>Price:</label>
        <input v-model="auction.price" id="price" type="number" min="1" step="1" placeholder="Price">
      </div>
      <div class="element">
        <label>Auction description:</label>
        <input v-model="auction.description" id="description" type="text" placeholder="Description">
      </div>
      <div class="element">
        <label>Type:</label>
        <select v-model="auction.type" id="select" name ="select">
          <option value="BID">BID</option>
          <option value="BUY">BUY</option>
        </select>
      </div>
      <div class="element" v-if="auction.type === 'BID'">
        <label>Ending date:</label>
        <input type="date" v-model="auction.date" placeholder="date">
      </div>
      <!-- <div class="element">
        <label>Start now:</label>
        <input type="checkbox" v-model="status" true-value="ONGOING" false-value="NEW">
      </div> -->
      <div class="element">
        <input type="button" @click="put()" value="Submit">
      </div>
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
        _id: this.inheritedAuction._id,
        username: this.inheritedAuction.username,
        name: this.inheritedAuction.name,
        price: this.inheritedAuction.price,
        date: this.inheritedAuction.date,
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
      axios
        .put("/api/auction", this.auction, { withCredentials: true })
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

<style lang="scss" scoped>
.auction-form {
  form {
    padding-top: 5px;
    .element {
      float: left;
    }
  }
}
</style>
