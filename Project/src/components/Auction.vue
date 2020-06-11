<template>
  <div class="auction" v-if="auction !== null">
    <div v-if="editMode === false">
      <AuctionInfo :auction="auction" :emitter="emitter" />
      <div v-if="editable === true">
        <button @click="edit()">Edit</button>
      </div>
      <div v-if="this.user.username !== auction.username && isAuthenticated">
        <button @click="chat()">Chat</button>
      </div>
      <div v-if="isValidStarter">
        <button @click="start()">Start</button>
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
import axios from "axios";
import router from "../router/index";
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
      emitter: io()
    };
  },
  computed: {
    ...mapGetters(["user", "isAuthenticated"]),
    editable: function () {
      return this.isAuthenticated === true && this.auction.username === this.user.username && this.auction.status === "NEW";
    },
    isValidStarter: function () {
      return this.user.username === this.auction.username && this.isAuthenticated && this.auction.status === "NEW";
    }
  },
  methods: {
    edit () {
      this.editMode = !this.editMode;
    },
    start () {
      this.emitter.emit("start", {
        _id: this.auction._id,
        status: "ONGOING"
      });
    },
    async chat () {
      const users = [this.auction.username, this.user.username];

      let result = {};

      await axios.post("/api/exists", { users: users })
        .then((cb) => {
          if (cb.data === null) {
            axios.post("/api/chat", { users: users })
              .then((cb) => {
                result = cb.data._id;
              })
              .catch((error) => {
                console.log(error);
              });
          } else {
            result = cb.data._id;
          }
          console.log(`passed id=${result}"`);
          router.push({ name: "UserChatsView", params: { id: result } });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  },
  beforeDestroy () {
    if (this.isAuthenticated && this.auction.type === "BID" && this.auction.status === "ONGOING") {
      this.emitter.emit("leave", {
        id: this.auction._id,
        username: this.user.username
      });
      console.log("left");
    };
  },
  created () {
    if (this.isAuthenticated) {
      this.emitter.emit("join", {
        _id: this.auction._id,
        username: this.user.username
      });
    }

    this.emitter.on("start", (cb) => {
      console.log("changing value");
      this.auction.status = "ONGOING";
    });

    this.emitter.on("new_buy", (cb) => {
      console.log("new buy");
      this.auction.status = "SOLD";
      this.auction.highest_bidder = cb.highest_bidder;
    });

    this.emitter.on("new_bid", (cb) => {
      console.log("new bid");
      this.auction.price = cb.price;
      this.auction.highest_bidder = cb.highest_bidder;
    });
  }
};
</script>

<style lang="scss" scoped>
  .auction {
    padding: 1vh;
    margin-top: 1vh;
  }
</style>
