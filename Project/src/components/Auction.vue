<template>
  <div class="auction" v-if="auction !== null">
    <div v-if="editMode === false">
      <AuctionInfo :auction="auction" />
      <div v-if="editable === true">
        <button @click="edit()">Edit</button>
      </div>
      <div v-if="isValidBidder">
        <div v-if="auction.type === 'BID'">
          <button @click="bid()">Bid</button>
          <input v-model="price" type="number" min="1" step="1" max=6 >
        </div>
        <div v-else-if="auction.type === 'BUY'">
          <button @click="buy()">Buy</button>
        </div>
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
      emitter: io(),
      price: ""
    };
  },
  computed: {
    ...mapGetters(["user", "isAuthenticated"]),
    editable: function () {
      return this.isAuthenticated === true && this.auction.username === this.user.username && this.auction.status === "NEW";
    },
    isValidStarter: function () {
      return this.user.username === this.auction.username && this.isAuthenticated && this.auction.status === "NEW";
    },
    isValidBidder: function () {
      return this.user.username !== this.auction.username && this.isAuthenticated;
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
    buy () {
      this.emitter.emit("new_buy", {
        _id: this.auction._id,
        bidders: this.user.username,
        highest_bidder: this.user.username,
        status: "SOLD"
      });
    },
    bid () {
      if (this.price <= this.auction.price) {
        console.log("Pay more plz");
      } else {
        this.emitter.emit("new_bid", {
          _id: this.auction._id,
          highest_bidder: this.user.username,
          price: this.price
        });
      }
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
