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
.app {
  //font-family: "MetaWeb-Normal", sans-serif;
  padding-top: 5vh;
  font-family: Helvetica, Arial, sans-serif;
  background: linear-gradient(to right, #57c1eb 0%,#639FAB 100%);
}
button {
  background-color: #3333;
  font-weight: 600;
  text-align: center;
  padding: 5px;
  border-radius: 6px;
}

</style>
