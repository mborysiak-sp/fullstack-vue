<template>
  <div class="owned-auctions">
    <Auctions :conditions="passedCondition" />
  </div>
</template>

<script>
import Auctions from "./Auctions";
import { mapGetters } from "vuex";

export default {
  name: "OwnedAuctions",
  computed: {
    ...mapGetters(["user"])
  },
  data () {
    return {
      passedCondition: { username: this.$store.getters.user.username }
    };
  },
  components: {
    Auctions
  }
};
</script>

<style scoped lang="scss">

</style>
