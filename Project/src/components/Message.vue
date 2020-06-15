<template>
  <div class="message" :class="me">
    <span class="username" :class="me">{{ message.username }}</span>
    <span class="text">{{ message.text }}</span>
  </div>
</template>

<script>
export default {
  name: "Message",
  computed: {
    me () {
      let result = false;
      if (this.$store.getters.user.username === this.message.username) {
        result = true;
      }
      return result ? "me" : "";
    }
  },
  props: ["message"]
};
</script>

<style lang="scss" scoped>
.message {
  display: flex;
  flex-direction: column;
  max-width: 50%;
  clear: both;
  .text {
    padding: 8px;
    margin: 4px;
    text-align: left;
    word-break: break-all;
    background-color: #b967ff;
    border-radius: 4px;
  }
  .username {
    margin: 4px;
    font-size: 10px;
    color: red;
  }
  .username.me
  {
    display: none;
  }
}

.message.me {
  margin-left: auto;
  br.me {
    display: none;
  }
}
</style>
