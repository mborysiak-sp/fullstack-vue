<template>
  <div class="user-chats">
    <UserChats />
  </div>
</template>

<script>
import UserChats from "@/components/UserChats";

export default {
  name: "UserChatsView",
  components: {
    UserChats
  }
};
</script>

<style lang="scss" scoped>
.user-chats {
  background-color:wheat;
  height: 100%;
}
</style>
