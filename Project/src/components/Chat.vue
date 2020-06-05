<template>
  <div class="chat" v-if="chat !== null">
    <input id="message-text" v-model="text" type="text" placeholder="Text">
    <button @click="send()">Send</button>
    <div v-for="message in chat.messages" :key="message._id">
      {{ message.username }}: {{message.text}}
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import io from "socket.io-client";

export default {
  name: "Chat",
  computed: {
    ...mapGetters(["user", "isAuthenticated"])
  },
  data () {
    return {
      emitter: io(),
      chat: null,
      text: ""
    };
  },
  methods: {
    send () {
      if (this.messageInput === "") {
        console.log("Empty message");
      } else {
        const body = {
          _id: this.chat._id,
          username: this.user.username,
          text: this.text
        };
        this.emitter.send(body);
      }
    }
  },
  created () {
    if (this.isAuthenticated) {
      this.emitter.emit("join", { _id: this.chat._id, username: this.user.username });
    }

    this.emitter.on("new_message", (cb) => {
      this.chat.messages.push(cb);
    });

    window.onbeforeunload = () => {
      if (this.isAuthenticated) {
        this.emitter.emit("leave", { _id: this.chat._id, username: this.user.username });
      }
    };

    const checkIfNotSeen = (message) => {
      return message.seen !== true && this.user.username !== message.username;
    };

    for (const message of this.chat.messages) {
      if (checkIfNotSeen(message) === true) {
        this.emitter.emit("seen", { _id: this.chat._id, username: this.user.username });
        break;
      }
    }
  }
};
</script>

<style>

</style>
