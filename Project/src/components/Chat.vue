<template>
  <div class="chat" v-if="chat !== null">
    <div class="username">
      Chatting with: {{ otherUser }}
    </div>
    <br>
    <table>
      <tr></tr>
      <tr style="position: fixed; background-color: palegoldenrod;"><label>Type your message:</label>
      <input id="message-text"  v-model="text" type="text" placeholder="Text" required>
      <button @click="send()">Send</button></tr>
      <tr></tr>
      <div v-for="message in chat.messages" :key="message._id">
        <tr><th>{{ message.username }}:</th><td> {{message.text}}</td></tr>
      </div>
    </table>
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
      text: "",
      chat: this.inheritedChat
    };
  },
  props: ["inheritedChat", "otherUser"],
  methods: {
    send () {
      if (document.getElementById("message-text").value === "") {
      } else {
        const body = {
          _id: this.chat._id,
          username: this.user.username,
          text: this.text
        };
        this.emitter.emit("new_message", body);
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

    const checkIfNotSeen = (message) => {
      return message.seen !== true && this.user.username !== message.username;
    };

    for (const message of this.chat.messages) {
      if (checkIfNotSeen(message) === true) {
        this.emitter.emit("seen", { _id: this.chat._id, username: this.user.username });
        break;
      }
    }
  },
  beforeDestroy () {
    if (this.isAuthenticated) {
      this.emitter.emit("leave", { _id: this.chat._id, username: this.user.username });
    }
  }
};
</script>

<style lang="scss" scoped>
.chat {
  .username {
    font-weight: 800;
    text-align: center;
    position: fixed;
    background-color: palegoldenrod;
  }
  table {
    label {
      font-weight: 700;
    }
    tr {
      text-align: left;
      th {
      }
      td {
            word-break: break-all;
      }
    }
  }
}
</style>
