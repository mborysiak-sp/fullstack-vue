<template>
  <div class="chat" v-if="chat !== null && chat !== undefined">
    <Message v-for="message in chat.messages" :message="message" :key="message._id" />
    <div id="input-message">
      <label>Type your message:</label>
      <input id="message-text" v-model="text" type="text" placeholder="Text" required>
      <button @click="send()">Send</button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Message from "@/components/Message";
import io from "socket.io-client";

function scrollBottom () {
  this.$el.scrollTo(0, this.$el.scrollHeight);
}

export default {
  name: "Chat",
  components: { Message },
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
      this.$nextTick(scrollBottom);
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
  display: block;
  height: 50vh;
  height: inherit;
  width: 100%;
  padding: 2% 4%;
  box-sizing: border-box;
  overflow-y: scroll;
  #input-message {
    float: left;
  }
}
</style>
