<template>
  <div class="chat" v-if="chat !== null && chat !== undefined">
    <div class="message" v-for="message in chat.messages" :key="message._id">
      <div class="username">{{ message.username }}:</div>
      <div class="text">{{ message.text }}</div>
    </div>
    <div id="input-message">
      <label>Type your message:</label>
      <input id="message-text" v-model="text" type="text" placeholder="Text" required>
      <button @click="send()">Send</button>
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
      text: ""
    };
  },
  watch: {
    chat: function () {
      if (this.chat !== null && this.chat !== undefined) {
        this.leave();
      }
      this.join();
      console.log("see");
      this.see();
    }
  },
  props: ["chat", "otherUser"],
  methods: {
    leave () {
      if (this.isAuthenticated) {
        this.emitter.emit("leave", { _id: this.chat._id, username: this.user.username });
      }
    },
    join () {
      if (this.isAuthenticated) {
        this.emitter.emit("join", { _id: this.chat._id, username: this.user.username });
      }
    },
    see () {
      const checkIfNotSeen = (message) => {
        return message.seen !== true && this.user.username !== message.username;
      };
      if (this.chat.messages.reverse().find(message => checkIfNotSeen(message)) !== undefined) {
        console.log("Send seen");
        this.emitter.emit("seen", { _id: this.chat._id, username: this.user.username });
      }
    },
    send () {
      if (document.getElementById("message-text").value === "") {
      } else {
        console.log("Chat id =" + this.chat._id);
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
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  .message {
    text-align: left;
    .username {
      word-break: break-all;
    }
    .text {
      word-break: break-all;
    }
  }
  #input-message {

  }
}
</style>
