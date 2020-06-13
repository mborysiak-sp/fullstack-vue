<template>
  <div class="home">
    <div class="auction-list">
      <Auctions />
    </div>
  </div>
</template>

<script>
import Auctions from "@/components/Auctions";
import { mapGetters, mapActions } from "vuex";
import axios from "axios";

export default {
  name: "home",
  computed: {
    ...mapGetters(["isAuthenticated", "user"])
  },
  methods: {
    ...mapActions(["setUser"]),
    async checkChats () {
      let chats = [];
      const unseenMessages = (chat) => {
        const checkIfNotSeen = (message) => {
          return message.seen !== true && this.user.username !== message.username;
        };
        if (chat.messages.find(message => checkIfNotSeen(message)) !== undefined) {
          return true;
        }
      };
      await axios.get("/api/chats")
        .then((resp) => {
          chats = resp.data;
        })
        .catch((error) => {
          console.log(error);
        });
      for (const chat of chats) {
        if (unseenMessages(chat)) {
          return true;
        };
      }
      return false;
    }
  },
  components: {
    Auctions
  },
  async created () {
    let areUnread = false;
    areUnread = await this.checkChats();
    if (this.isAuthenticated && areUnread) {
      alert("New messages received");
    };
  }
};
</script>

<style scoped lang="scss">
.home {
  background-color:wheat;
  height: 100%;
  text-align: center;
  width: 75%;
  margin: auto;
  .auction-list {
    margin: auto;
    text-align: center;
    background-color: rgba(0,0,0,0.1);
  }
}
</style>
