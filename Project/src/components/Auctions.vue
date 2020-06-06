<template>
  <div class="auctions">
    <div v-for="auction in auctions" :key="auction._id">
      <Auction :auction="auction" />
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
      auctions: null
    };
  },
  components: {
    Auction
  },
  created () {
    axios.get("/api/auctions", { withCredentials: true })
      .then(resp => {
        this.auctions = resp.data;
      });
  }
};
</script>

<style>

</style>
