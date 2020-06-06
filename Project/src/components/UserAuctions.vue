<template>
  <div class="user-auctions">
    <div class="auctions">
      <b>Owned auctions</b>
      <div v-for="auction in ownedAuctions" :key="auction._id">
        <Auction :auction="auction" />
      </div>
    </div>
    <div class="auctions">
      <b>Bidded auctions</b>
      <div v-for="auction in biddedAuctions" :key="auction._id" class="auctions">
        <Auction :auction="auction" />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Auction from "./Auction";

export default {
  name: "Auctions",
  data () {
    return {
      ownedAuctions: null,
      biddedAuctions: null
    };
  },
  components: {
    Auction
  },
  created () {
    axios.get("/api/user_owned_auctions", { withCredentials: true })
      .then(resp => {
        this.ownedAuctions = resp.data;
      });
    axios.get("/api/user_bidded_auctions", { withCredentials: true })
      .then(resp => {
        this.biddedAuctions = resp.data;
      });
  }
};
</script>

<style scoped lang="scss">
.user-auctions {
  .auctions {
    float: left;
  }
}

</style>
