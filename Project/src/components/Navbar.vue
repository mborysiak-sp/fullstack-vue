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
        <input type="button" @click="logoff" value="Logout">
      </div>
      <div v-if="isAuthenticated" class="username">
        Logged as: {{ user.username }}
      </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
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
  background-color: #ddd;
  font-size: 24px;
  padding: 0;
  margin: 0;
  top: 0;
  left: 0;
  max-height: 10vh;
  width: 100vw;
  position: fixed;
  text-align: center;
  align-items: center;
  justify-content: center;
  .username {
    margin: 1px;
    top: 50%;
    padding: 1px;
    display: block;
    float: right;
    font-weight: 600;
    color:blueviolet;
  }
  .item {
    margin: 1px;
    padding: 1px;
    display: block;
    float: left;
    a {
      font-weight: bold;
      color: #777;
      &.router-link-exact-active {
        color: blueviolet;
      }
    }
  }
}

</style>
