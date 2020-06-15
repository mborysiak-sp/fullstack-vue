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

<style lang="scss">
body {
  overflow: hidden;
  ::-webkit-scrollbar
  {
    width: 1vw;
    height: 1vh;
  }

  ::-webkit-scrollbar-track
  {
    background: #05ffa1
  }

  ::-webkit-scrollbar-thumb
  {
    background: #ff71ce;
  }
}
.app {
  padding-top: 0;
  margin-top: 0;
  top: 0;
  height: 100vh;
  font-family: Helvetica, Arial, sans-serif;
  background: linear-gradient(to top, #01cdfe 0%,#b967ff 100%);
}
button {
  background-color: #fffb96;
  font-weight: 600;
  text-align: center;
  padding: 5px;
  border-radius: 6px;
}

</style>
