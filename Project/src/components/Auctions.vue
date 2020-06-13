<template>
  <div class="auctions">
  <table>
    <div v-for="auction in auctions" :key="auction._id">
      <Auction :auction="auction" />
    </div>
  </table>
    <button v-if="currentAuctions != 0 && currentAuctions % 10 === 0" class="load-button" @click="loadAuctions">Load more auctions</button>
  </div>
</template>

<script>
import axios from "axios";
import Auction from "./Auction";
import moment from "moment";

export default {
  name: "Auctions",
  data () {
    return {
      currentAuctions: 0,
      auctions: {},
      date: null
    };
  },
  components: {
    Auction
  },
  methods: {
    loadAuctions () {
      const limit = 10;
      let result = [];
      axios.post("/api/auctions_limited", { from: this.currentAuctions, limit: limit }, { withCredentials: true })
        .then(resp => {
          const bids = resp.data.filter(auction => auction.type === "BID");
          const buys = resp.data.filter(auction => auction.type === "BUY");
          result = bids
            .filter(auction => auction.status === "NEW" || auction.status === "SOLD")
            .concat(this.endAuctions(resp.data.filter(auction => auction.status === "ONGOING"))).concat(buys);
          if (this.currentAuctions === 0) {
            this.auctions = result;
          } else {
            this.auctions = this.auctions.concat(result);
          }
          this.currentAuctions = this.auctions.length;
        });
    },
    endAuctions (auctions) {
      const results = [];
      for (const auction of auctions) {
        if (!this.isDateOkay(auction)) {
          this.end(auction._id);
        } else {
          results.push(auction);
        }
      }
      return results;
    },
    convertToDate (string) {
      const date = moment(string).format("YYYY-MM-DD");
      return date;
    },
    isDateOkay (auction) {
      if (new Date(this.date).getTime() < new Date(this.convertToDate(auction.date)).getTime()) {
        return true;
      } else {
        return false;
      }
    },
    end (id) {
      axios
        .patch(
          "/api/end",
          { _id: id }, { withCredentials: true })
        .then(() => {
          console.log("Ended");
        })
        .catch((error) => {
          this.logError(error);
        });
    }
  },
  async created () {
    await axios.get("/api/date")
      .then((res) => {
        console.dir(res);
        this.date = res.data.date;
      });
    this.loadAuctions();
  }

};
</script>

<style lang="scss" scoped>
.auctions {
  text-align: center;
  margin-top: 1vh;
  padding-top: 1vh;
  .load-button {
    background-color: purple;
  }
}
</style>
