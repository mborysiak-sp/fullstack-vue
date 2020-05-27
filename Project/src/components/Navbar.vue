<template>
  <div class="navbar">
    <div class="nav">
      <router-link to="/">Home</router-link>
      <router-link to="/login">Login</router-link>
    </div>
    <div class="cont">
      <router-view />
    </div>
  </div>

</template>

<script>
export default {};
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
