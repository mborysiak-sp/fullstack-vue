<template>
  <div class="user-chats" v-if="chats !== null">
    <div class="users-container">
      <b>Users:</b>
      <div id="users" v-for="chatEl in chats" :key="chatEl._id">
        <div class="user" v-if="chatEl !== null" v-on:click="openChat(chatEl)">
            {{ otherUser(chatEl) }}
        </div>
      </div>
    </div>
    <div id="chat-container">
      <Chat v-if="chat !== null" :inheritedChat="chat" :otherUser="otherUser(chat)" />
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
    ...mapGetters(["user"])
  },
  data () {
    return {
      chats: null,
      chat: null
    };
  },
  created () {
    if (this.$route.params.chat !== null && this.$route.params.chat !== undefined) {
      this.chat = this.$route.params.chat;
    }

    axios.get("/api/chats")
      .then((resp) => {
        this.chats = resp.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  components: { Chat },
  methods: {
    otherUser (chat) {
      return chat.users.find(user => user !== this.user.username);
    },
    openChat (chat) {
      this.chat = chat;
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
    background-color: purple;
    margin-top: 10px;
    margin-bottom: 10px;
    .user {
      background-color: gray;
      opacity: 50%;
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
