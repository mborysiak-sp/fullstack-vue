<template>
    <div class="app">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <Navbar />
      <router-view />
    </div>
</template>

<script>
import Navbar from "@/components/Navbar";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "App",
  components: {
    Navbar
  },
  methods: {
    ...mapActions(["setUser"])
  },
  computed: {
    ...mapGetters(["user"])
  },
  created () {
    this.setUser();
  }
};
</script>

<style lang="scss" scoped>
body {
  height: 100vh;
  width: 100vw;
  padding: 0;
  margin: 0;
  font-family: "MetaWeb-Normal", sans-serif;
  .app {
    top: 0;
    left: 0;
    height: 100vh;
    background-color: whitesmoke;
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
