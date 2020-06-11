<template>
  <div class="chat" v-if="chat !== null && chat !== undefined">
    <div class="username">
      Chatting with: {{ otherUser }}
    </div>
    <br>
    <table>
      <tr></tr>
      <tr id="input"><label>Type your message:</label>
      <input id="message-text" v-model="text" type="text" placeholder="Text" required>
      <button @click="send()">Send</button></tr>
      <tr></tr>
      <div v-for="message in chat.messages" :key="message._id">
        <tr><th> {{ message.username }}: </th><td> {{ message.text }} </td></tr>
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
      if (this.chat.messages.find(message => checkIfNotSeen(message)) !== undefined) {
        console.log("Send seen");
        this.emitter.emit("seen", { _id: this.chat._id, username: this.user.username });
      }
      // for (const message of this.chat.messages) {
      //   if (checkIfNotSeen(message) === true) {
      //     break;
      //   }
      // }
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
    // console.dir(this.chat.messages);
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
  .username {
    font-weight: 800;
    text-align: center;
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
        display: flex;
        word-break: break-all;
      }
    }
  }
}
</style>
