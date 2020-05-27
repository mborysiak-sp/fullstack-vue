<template>
  <div>
    <h2>Login</h2>
    <div class="row">
      <h4>Login</h4>
      <form @submit.prevent="loginUser">
        <label for="username">Username</label>
        <input type="text"
          id="username"
          placeholder="Username"
          name="username"
          v-model="username"
          class="form-control">
        <label for="password">Password</label>
        <input type="password"
          id="password"
          placeholder="Password"
          name="password"
          v-model="password"
          class="form-control">
          <input type="submit" class="login-button" value="Login">
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data () {
    return {
      username: "",
      password: ""
    };
  },
  methods: {
    ...mapActions(["login"]),
    loginUser () {
      const user = {
        username: this.username,
        password: this.password
      };
      this.login(user)
        .then(() => {
          this.$router.push("/");
        })
        // eslint-disable-next-line handle-callback-err
        .catch(err => {
          console.log("Cannot log in");
        });
    }
  }
};
</script>

<style>

</style>
