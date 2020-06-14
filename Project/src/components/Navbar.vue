<template>
  <div class="navbar">
    <div class="nav">
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
        <div v-if="isAuthenticated" class="item" id="user-stuff">
          <input type="button" @click="logoff" value="Logout">
        </div>
        <div v-if="isAuthenticated" class="item" id="user-stuff">
          Logged as: {{ user.username }}
        </div>
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
  background-color: #222222;
  top: 0;
  left: 0;
  width: 100vw;
  position: fixed;
  // text-align: center;
  // align-items: center;
  // justify-content: center;
  // overflow: hidden;
  #user-stuff {
    float: right;
    font-weight: 600;
    color: #1C5D99;
  }
  .item {
    padding: 1vmax;
    float: left;
    a {
      font-weight: bold;
      text-decoration: none;
      color: #BBCDE5;
      &.router-link-exact-active {
        color: #1C5D99;
      }
    }
  }
}
</style>
