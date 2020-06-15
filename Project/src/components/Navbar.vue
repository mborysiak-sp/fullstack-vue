<template>
  <div class="navbar">
    <div class="item">
      <router-link to="/">Home</router-link>
    </div>
    <div v-if="!isAuthenticated" class="item">
      <router-link to="/register">Register</router-link>
    </div>
    <div v-if="isAuthenticated" class="item">
      <router-link to="/userPanel">User Panel</router-link>
    </div>
    <div v-if="isAuthenticated" class="item">
      <router-link to="/userChatsView">User chats</router-link>
    </div>
    <div v-if="isAuthenticated" class="item">
      <button @click="logoff">Logout</button>
    </div>
    <div v-if="isAuthenticated" class="item">
      Logged as: {{ user.username }}
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import router from "../router";

export default {
  name: "Navbar",
  computed: {
    ...mapGetters(["isAuthenticated", "user"])
  },
  methods: {
    ...mapActions(["logout"]),
    logoff () {
      this.logout()
        .then(() => {
          alert("Logged out");
          router.push("Home");
        })
        .catch((error) => {
          const message = error.response.data.message;
          alert(`${message}`);
        });
    }
  }
};
</script>

<style lang="scss">
.navbar {
  background-color: #b967ff;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  text-align: center;
  min-height: 5vh;
  max-height: 20vh;
  word-break: break-all;
  word-wrap: break-word;
  padding: 0 auto 5vh auto;
  margin: 0 auto 5vh auto;
  font-weight: bold;
  color: #01cdfe;
  .item {
    padding: 1vmax;
    a {
      font-weight: bold;
      text-decoration: none;
      color: #01cdfe;
      &.router-link-exact-active {
        color: #05ffa1;
      }
    }
  }
}
</style>
