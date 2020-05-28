<template>
    <div class="app">
      <Navbar />
    </div>
</template>

<script>
import Navbar from "@/components/Navbar";
import { mapGetters } from "vuex";

export default {
  name: "App",
  components: {
    Navbar
  },
  computed: {
    ...mapGetters(["user"])
  }
};
</script>

<style scoped>

</style>
