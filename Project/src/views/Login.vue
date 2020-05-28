<template>
  <div>
    <div class="login">
      <h4>Login</h4>
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
    async submit () {
      const user = {
        username: this.username,
        password: this.password
      };
      this.login(user)
        .then(() => {
          this.$swal("Great", "Ready", "success");
          this.$router.push({ name: "Home" });
        })
        .catch((error) => {
          const message = error.response.data.message;
          this.$swal("Oh ho", `${message}`, "error");
        });
    },
    clear () {
      this.$refs.form.reset();
    }
  }
};
</script>

<style>

</style>
