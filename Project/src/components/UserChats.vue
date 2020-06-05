<template>
  <div class="user-chats" v-if="chats !== null">
    <div v-for="chatEl in chats" :key="chatEl._id">
      <div v-if="chatEl !== null" v-on:click="openChat(chatEl)">
          {{ otherUser(chatEl) }}
      </div>
    </div>
    <div v-if="chat !== null">
      <Chat :inheritedChat="chat" />
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

<style>

</style>
