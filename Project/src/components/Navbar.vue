<template>
  <div class="navbar">
    <div class="nav">
      <router-link to="/">Home</router-link>
      <router-link to="/register">Register</router-link>
      <div v-if="isAuthenticated">
        <router-link to="/userPanel">User Panel</router-link>
        <input type="button" @click="logoff" value="Logout">
      </div>
    </div>
    <router-view />
  </div>

</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "Navbar",
  computed: {
    ...mapGetters(["isAuthenticated"])
  },
  methods: {
    ...mapActions(["logout"]),
    logoff () {
      this.logout()
        .then(() => {
          this.$swal("Logged out", "Logged", "success");
        })
        .catch((error) => {
          const message = error.response.data.message;
          this.$swal("Oh ho", `${message}`, "error");
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.navbar {
  .nav {
    background-color: #ddd;
    padding: 1em;
    padding-left: $left-padding;
  }
  .cont {
    margin: 1em;
  }
  a {
    text-decoration: none;
    font-weight: bold;
    font-family: sans-serif;
    color: #777;
    &.router-link-exact-active {
      color: cornflowerblue;
    }
  }
}
</style>
