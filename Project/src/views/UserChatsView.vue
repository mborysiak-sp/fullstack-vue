<template>
  <div class="user-chats-view">
    <UserChats :id="id" />
  </div>
</template>

<script>
import UserChats from "@/components/UserChats";

export default {
  name: "UserChatsView",
  components: {
    UserChats
  },
  data () {
    return {
      id: this.$route.params.id
    };
  }
};
</script>

<style lang="scss" scoped>
.user-chats-view {
  // margin-top: 10vh;
  // margin-bottom: 10vh;
}
</style>
