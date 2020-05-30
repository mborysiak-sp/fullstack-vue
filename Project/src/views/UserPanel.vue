<template>
  <div class="user-panel">
    <h2>Hello {{user.username}} </h2>
    <AuctionForm />
  </div>
</template>

<script>
import AuctionForm from "@/components/AuctionForm";
import { mapGetters } from "vuex";

export default {
  name: "UserPanel",
  components: {
    AuctionForm
  },
  computed: {
    ...mapGetters(["user"])
  }
};
</script>

<style>

</style>
