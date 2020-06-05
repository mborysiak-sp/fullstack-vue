<template>
  <div class="user-chats">
    <div v-for="chat in chats" :key="chat._id">
      <div v-on:click="openChat(chat)">
          {{ otherUser(chat) }}
      </div>
    </div>
    <Chat :chat="chat" />
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
    otherUser (chat) {
      return chat.users.find(user => user !== this.user.username);
    }
  },
  data () {
    return {
      chats: {},
      chat: {}
    };
  },
  created () {
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
    openChat (chat) {
      this.chat = chat;
      location.reload();
    }
  }
};
</script>

<style>

</style>
