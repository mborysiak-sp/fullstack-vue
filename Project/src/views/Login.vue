<template>
  <div>
    <h2>Login</h2>
    <div class="row">
      <h4>Login</h4>
      <form>
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
          <button class="login-button">Login</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  username: "",
  password: ""
};
</script>

<style>

</style>
