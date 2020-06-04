<template>
    <div class="app">
      <Navbar />
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
    ...mapActions(["setUser", "setSocket"])
  },
  created () {
    this.setUser();
    this.setSocket();
  }
};
</script>

<style scoped>

</style>
