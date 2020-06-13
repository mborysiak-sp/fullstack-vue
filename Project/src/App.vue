<template>
    <div class="app">
      <Navbar />
      <router-view />
    </div>
</template>

<script>
import Navbar from "@/components/Navbar";
import { mapActions } from "vuex";

export default {
  name: "App",
  components: {
    Navbar
  },
  methods: {
    ...mapActions(["setUser"])
  },
  created () {
    this.setUser();
  }
};
</script>

<style lang="scss" scoped>
body {
  padding: 0;
  margin: 0;
  font-family: "MetaWeb-Normal", sans-serif;
  .app {
    top: 0;
    left: 0;
    height: 100vh;
  }
  button {
    background-color: #3333;
    font-weight: 600;
    text-align: center;
    padding: 5px;
    border-radius: 6px;
  }
}

</style>
