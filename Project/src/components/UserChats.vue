<template>
  <div class="user-chats" v-if="chats !== null && chats !== undefined">
    <div id="users-container">
      <b>Users:</b>
      <div class="user" v-for="chatEl in chats" :key="chatEl._id" v-on:click="openChat(chatEl)">
        {{ otherUser(chatEl) }}
        <div v-if="checkChat(chatEl)">(unread)</div>
      </div>
    </div>
    <div id="chat-container">
      <Chat v-if="chat !== null" :chat="getChat" :otherUser="otherUser(chat)" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import axios from "axios";
import Chat from "@/components/Chat.vue";

export default {
  name: "UserChats",
  computed: {
    ...mapGetters(["user"]),
    getChat: function () {
      return this.chat;
    }
  },
  props: ["id"],
  data () {
    return {
      chats: null,
      chat: null
    };
  },
  async created () {
    await axios.get("/api/chats")
      .then((resp) => {
        this.chats = resp.data;
      })
      .catch((error) => {
        console.log(error);
      });

    if (this.id !== null && this.id !== undefined) {
      console.log("Passing");
      this.chat = this.chats.find(chat => chat._id === this.id);
    }
  },
  components: { Chat },
  methods: {
    otherUser (chat) {
      console.log(chat.users.find(user => user !== this.user.username));
      return chat.users.find(user => user !== this.user.username);
    },
    openChat (chat) {
      this.chat = chat;
      this.$set(this.chat, chat, chat);
    },
    checkChat (chat) {
      const checkIfNotSeen = (message) => {
        return message.seen !== true && this.user.username !== message.username;
      };
      if (chat.messages.find(message => checkIfNotSeen(message)) !== undefined) {
        console.log("unread found");
        return true;
      }
      return false;
    }
  }
};
</script>

<style lang="scss" scoped>
.user-chats {
  display: flex;
  margin-left: auto;
  margin-right: auto;
  padding: 3vmin;
  padding-top: 5vh;
  flex-direction: row;
  #users-container {
    flex-basis: 20%;
    border: 1px solid pink;
    flex-direction: column;
    text-align: center;
    height: 0%;
    flex: 1;
    flex-wrap: wrap;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .user {
      margin: 1vh auto;
      background-color: gray;
      color: black;
    }
  }
  #chat-container {
    flex-basis: 80%;
    //margin-left: 20vw;
    // flex-grow: 1;
    // display: flex;
    //flex-wrap: wrap;
    //justify-content: flex-start;
    //overflow: auto;
  }
}

</style>
