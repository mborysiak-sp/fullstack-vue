<template>
  <div class="chat" v-if="chat !== null && chat !== undefined">
    <div id="message-container">
      <Message v-for="message in chat.messages" :message="message" :key="message._id" />
    </div>
    <MessageForm :id="chat._id" :emitter="emitter"/>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Message from "@/components/Message";
import MessageForm from "@/components/MessageForm";
import io from "socket.io-client";

function scrollBottom () {
  document.getElementById("message-container").scrollTo(0, document.getElementById("message-container").scrollHeight);
}

export default {
  name: "Chat",
  components: { Message, MessageForm },
  computed: {
    ...mapGetters(["user", "isAuthenticated"])
  },
  data () {
    return {
      emitter: io()
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
    }
  },
  created () {
    if (this.isAuthenticated) {
      this.emitter.emit("join", { _id: this.chat._id, username: this.user.username });
      this.$nextTick(scrollBottom);
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
  #message-container {
    display: flex;
    flex-shrink: 0;
    flex-grow: 1;
    height: 50vh;
    align-self: center;
    padding: 2vh 4vw;
    flex-direction: column;
    box-sizing: border-box;
    overflow-y: auto;
    //padding-bottom: 30vh;
  }
}
</style>
