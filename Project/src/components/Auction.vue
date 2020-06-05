<template>
  <div class="auction" v-if="auction !== null">
    <div v-if="editMode === false">
      <AuctionInfo :auction="auction"  :socket="this.socket"/>
      <div v-if="editable === true">
        <button @click="edit()">Edit</button>
      </div>
    </div>
    <div v-else-if="editMode === true">
      <AuctionEditForm :inheritedAuction="auction" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import AuctionInfo from "./AuctionInfo";
import AuctionEditForm from "./AuctionEditForm";
import io from "socket.io-client";

export default {
  name: "Auction",
  props: ["auction"],
  components: {
    AuctionInfo,
    AuctionEditForm
  },
  data () {
    return {
      editMode: false,
      socket: io()
    };
  },
  computed: {
    ...mapGetters(["user", "isAuthenticated"]),
    editable: function () {
      return this.isAuthenticated === true && this.auction.username === this.user.username && this.auction.status === "NEW";
    }
  },
  methods: {
    edit () {
      this.editMode = !this.editMode;
    }
  },
  beforeDestroy () {
    if (this.isAuthenticated && this.auction.type === "BID" && this.auction.status === "ONGOING") {
      this.socket.emit("leave", {
        id: this.auction._id,
        username: this.user.username
      });
      console.log("left");
    };
  },
  created () {
    if (this.isAuthenticated && this.auction.type === "BID" && this.auction.status === "ONGOING") {
      this.socket.emit("join", {
        _id: this.auction._id,
        username: this.user.username
      });
    }

    this.socket.on("new_buy", (cb) => {
      console.log("new bid");
      this.auction.status = "SOLD";
      this.auction.highest_bidder = cb.highest_bidder;
    });

    this.socket.on("new_bid", (cb) => {
      console.log("new bid");
      this.auction.price = cb.price;
      this.auction.highest_bidder = cb.highest_bidder;
    });

    window.onbeforeunload = () => {
      if (this.isAuthenticated && this.auction.type === "BID" && this.auction.status === "ONGOING") {
        this.socket.emit("leave", {
          _id: this.auction._id,
          username: this.user.username
        });
        console.log("left");
      };
    };
  }
};
</script>

<style>

</style>
