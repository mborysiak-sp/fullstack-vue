<template>
  <div class="user-chats">
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
.user-chats {
  background-color:wheat;
  height: 100%;
}
</style>
