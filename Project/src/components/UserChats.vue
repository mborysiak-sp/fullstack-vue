<template>
  <div class="user-chats" v-if="chats !== null && chats !== undefined">
    <div id="users-container">
      <b>Users:</b>
      <div class="user" v-for="chatEl in chats" :key="chatEl._id">
        <button @click="openChat(chatEl)">{{ otherUser(chatEl) }}</button>
        <div v-if="checkChat(chatEl)">(unread)</div>
      </div>
    </div>
    <Chat id="chat" v-if="chat !== null" :chat="getChat" :otherUser="otherUser(chat)" />
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
  //display: flex;
 // margin-left: auto;
  //margin-right: auto;
  //padding-right: auto;
  //padding-left: auto;
  //padding: 3vmin;
  padding: 5vh 5vw;
  //flex-direction: row;
  #users-container {
    //flex-basis: 30%;
    float: left;
    width: 20vw;
    //border: 1vmax solid ;
    flex-direction: column;
    text-align: center;
    overflow: auto;
    height: 50vh;
    flex: 1;
    flex-wrap: nowrap;
    display: flex;
    justify-content: space-between;
    .user {
      cursor: pointer;
      max-width: 100%;
      word-break: break-all;
      //background-color: #BBCDE5;

      //margin: 1vh auto;
      //border-radius: 10vmax;
      //padding: 1vmax;
      //border: 1px solid pink;
    }
  }
  #chat {
    float: left;
    //flex-basis: 70%;
    width: 65vw;
  }
}

</style>
