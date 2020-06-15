<template>
  <div class="message-form">
    <label>Type your message:</label>
    <textarea
      id="message-form"
      v-model="text"
      placeholder="Your message"
      maxlength="256"
      @keydown.enter="send" />
    <button @click="send()">Send</button>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "MessageForm",
  data () {
    return {
      text: ""
    };
  },
  computed: {
    ...mapGetters(["user"])
  },
  props: ["id", "emitter"],
  methods: {
    send () {
      if (this.text === "") {
      } else {
        const body = {
          _id: this.id,
          username: this.user.username,
          text: this.text
        };
        this.emitter.emit("new_message", body);
        this.text = "";
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.message-form {
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  overflow: hidden;
  text-align: center;
  justify-content: space-between;
  textarea {
    //width: 20vw;
    min-height: 5vh;
    resize: none;
    outline: none;
  }
  button {
    width: 50vh;
    align-self: center;
  }
}
</style>
