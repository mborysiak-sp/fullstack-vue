<template>
  <div class="user-chats" v-if="chats !== null && chats !== undefined">
    <div class="users-container">
      <b>Users:</b>
      <div id="users" v-for="chatEl in chats" :key="chatEl._id">
        <div class="user" v-if="chatEl !== null"  v-on:click="openChat(chatEl)">
            {{ otherUser(chatEl) }}
            <div v-if="checkChat(chatEl)">(unread)</div>
        </div>
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
  padding-top: 50px;
  .users-container {
    float: left;
    position: fixed;
    width: 15%;
    text-align: center;
  }
  #users  {
    margin-top: 10px;
    margin-bottom: 10px;
    .user {
      background-color: gray;
      color: black;
      width: 100%;
    }
  }
  #chat-container {
    float: left;
    padding-left: 20%;
    width: 85%;
  }
}
</style>
