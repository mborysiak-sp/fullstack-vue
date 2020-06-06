<template>
  <div class="auctions">
    <div v-for="auction in auctions" :key="auction._id">
      <Auction :auction="auction" />
    </div>
    <button v-if="currentAuctions != 0 && currentAuctions % 10 === 0" class="load-button" @click="loadAuctions">Load more auctions</button>
  </div>
</template>

<script>
import axios from "axios";
import Auction from "./Auction";

export default {
  name: "Auctions",
  data () {
    return {
      currentAuctions: 0,
      auctions: {}
    };
  },
  components: {
    Auction
  },
  methods: {
    loadAuctions () {
      const limit = 10;
      axios.post("/api/auctions_limited", { from: this.currentAuctions, limit: limit }, { withCredentials: true })
        .then(resp => {
          if (this.currentAuctions === 0) {
            this.auctions = resp.data;
          } else {
            this.auctions = this.auctions.concat(resp.data);
          }
          this.currentAuctions = this.auctions.length;
        });
    }
  },
  created () {
    this.loadAuctions();
  }
};
</script>

<style lang="scss" scoped>
.auctions {
  margin-top: 1vh;
  padding-top: 1vh;
  .load-button {
    background-color: purple;
  }
}
</style>
