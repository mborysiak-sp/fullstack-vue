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
  margin: auto;
  padding: auto;
}
</style>
