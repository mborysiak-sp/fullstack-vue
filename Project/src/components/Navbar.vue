<template>
  <div class="navbar">
    <div style=" width:100%">
    </div>
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
        <div v-if="isAuthenticated" class="user-stuff">
          <input type="button" @click="logoff" value="Logout">
        </div>
        <div v-if="isAuthenticated" class="user-stuff">
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
    min-height: 35px;
    text-decoration: none;

    .nav {
      background-color: darkgoldenrod;
      z-index: 100;
      font-size: 24px;
      padding-bottom: 5px;
      margin: 0;
      top: 0;
      left: 0;
      width: 100vw;
      position: fixed;
      text-align: center;
      align-items: center;
      justify-content: center;
      .user-stuff {
        margin: 1px;
        top: 50%;
        padding: 1px;
        padding-right: 1em;
        display: block;
        float: right;
        font-weight: 600;
        color:blueviolet;
      }
      .item {
        margin: 1px;
        padding: 1px;
        padding-right: 5px;
        padding-left: 5px;
        display: block;
        float: left;
        a {
          font-weight: bold;
          color: dimgrey;
          text-decoration: none;
          &.router-link-exact-active {
            color: blueviolet;
          }
      }
    }
  }
}

</style>
