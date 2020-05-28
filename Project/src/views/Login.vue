<template>
  <div>
    <div class="login">
      <h4>Login</h4>
      <h5>Current user: {{user.username}}</h5>
      <form class="form" ref="form">
        <label>Username</label>
        <input
          type="text"
          name="username"
          v-model="username"
          required >
        <label>Password</label>
        <input
          type="password"
          name="password"
          v-model="password"
          required >
        <input type="button" @click="submit" value="Submit">
        <input type="button" @click="clear" value="Clear">
        <input type="button" @click="logoff" value="Logout">
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data () {
    return {
      username: "",
      password: ""
    };
  },
  computed: {
    ...mapGetters(["user"])
  },
  methods: {
    ...mapActions(["login", "logout", "getUser"]),
    async submit () {
      const user = {
        username: this.username,
        password: this.password
      };
      this.login(user)
        .then(() => {
          this.$swal("Great", "Ready", "success");
          // this.$router.push({ name: "Home" });
          this.clear();
        })
        .catch((error) => {
          const message = error.response.data.message;
          this.$swal("Oh ho", `${message}`, "error");
        });
    },
    clear () {
      this.$refs.form.reset();
    },
    logoff () {
      this.logout()
        .then(() => {
          this.$swal("Logged out", "Logged", "success");
          this.getUser();
        })
        .catch((error) => {
          const message = error.response.data.message;
          this.$swal("Oh ho", `${message}`, "error");
        });
    }
  },
  mounted () {
    this.getUser();
  }
};
</script>

<style>

</style>
