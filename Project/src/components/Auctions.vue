<template>
  <div class="auctions">
      <div class="container" v-for="auction in auctions" :key="auction._id">
        <Auction :auction="auction" />
      </div>
      <button v-if="currentAuctions != 0 && currentAuctions % 10 === 0" class="load-button" @click="loadAuctions">Load more auctions</button>
  </div>
</template>

<script>
import axios from "axios";
import Auction from "./Auction";
import moment from "moment";
import { mapGetters } from "vuex";

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
  computed: {
    ...mapGetters(["user"])
  },
  props: ["conditions"],
  methods: {
    loadAuctions () {
      const limit = 10;
      let result = [];
      axios.post("/api/auctions_limited", { conditions: this.conditions, from: this.currentAuctions, limit: limit }, { withCredentials: true })
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
      console.dir(this.auctions);
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
    console.dir(this.conditions);
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
  margin-top: 1vh;
  padding-top: 1vh;
  border-radius: 25px;
  background: #73AD21;
  .container {
    text-align: center;
    display: flex;
    flex-flow: column wrap;
    justify-content: space-evenly;
  }
  .load-button {
    background-color: purple;
  }
}
</style>
