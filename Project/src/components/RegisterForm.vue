<template>
  <div class="register-form">
    <h4>Register</h4>
    <form ref="form">
      <label>Username</label>
      <input
        type="text"
        name="username"
        maxlength="8"
        minlength="1"
        v-model="username"
        required >
      <label>Password</label>
      <input
        type="password"
        name="password"
        v-model="password"
        minLength="4"
        maxLength="256"
        required >
      <input type="button" @click="register" value="Submit">
      <input type="button" @click="clear" value="Clear">
    </form>
  </div>
</template>

<script>
import axios from "axios";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Register",
  data () {
    return {
      username: "",
      password: ""
    };
  },
  computed: {
    ...mapGetters(["error"])
  },
  methods: {
    ...mapActions(["register", "logError"]),
    async register () {
      const user = {
        username: this.username,
        password: this.password
      };
      axios.post(
        "/api/register",
        user,
        { headers: { "Content-Type": "application/json" }, withCredentials: true }
      )
        .then(() => {
          alert("Registration complete");
          this.clear();
        })
        .catch((error) => {
          this.logError(error);
          alert(`${error}`);
        });
    },
    clear () {
      this.$refs.form.reset();
    }
  }
};
</script>

<style lang="scss" scoped>
.register-form {
  form {
    padding: 1em;
    input {
      margin: 5px;
    }
    label {
      margin: 5px;
    }
  }
}
</style>
