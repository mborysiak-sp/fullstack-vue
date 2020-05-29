<template>
  <div class="auctions">
    <div v-for="auction in auctions" :key="auction._id">
      <div class="auction" @click="navigateTo(auction)">
        <div class="auction-name">
          <p>{{auction.name}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data () {
    return {
      auctions: null
    };
  },
  created () {
    axios.get("/api/auctions", { withCredentials: true })
      .then(resp => {
        this.auctions = resp.data;
      });
  },
  methods: {
    navigateTo (auction) {
      window.location.href = "/auction/id:" + auction._id;
    }
  }
};
</script>

<style>

</style>
