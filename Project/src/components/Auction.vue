<template>
  <div class="auction" v-if="auction !== null">
    <div v-if="editMode === false">
      <AuctionInfo :auction="auction" />
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

export default {
  name: "Auction",
  props: ["auction"],
  components: {
    AuctionInfo,
    AuctionEditForm
  },
  data () {
    return {
      editMode: false
    };
  },
  computed: {
    ...mapGetters(["user", "isAuthenticated", "socket"]),
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
    if (this.isAuthenticated && this.socket.emit("leave", {
      id: this.auction._id,
      username: this.user.username
    }));
    console.log("left");
  },
  created () {
    if (this.isAuthenticated && this.auction.type === "BID" && this.auction.status === "ONGOING") {
      this.socket.emit("join", {
        id: this.auction._id,
        username: this.user.username
      });
    }

    this.socket.on("new", (cb) => {
      console.log("new bid");
      this.auction.price = cb.price;
      this.auction.highestBidder = cb.highestBidder;
    });
  }
};
</script>

<style>

</style>
