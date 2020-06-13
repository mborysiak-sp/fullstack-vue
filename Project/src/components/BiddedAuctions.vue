<template>
  <div class="bidded-auctions">
    <Auctions :conditions="passedCondition" />
  </div>
</template>

<script>
import Auctions from "./Auctions";
import { mapGetters } from "vuex";

export default {
  name: "BiddedAuctions",
  computed: {
    ...mapGetters(["user"])
  },
  data () {
    return {
      passedCondition: { bidders: this.$store.getters.user.username }
    };
  },
  components: {
    Auctions
  }
};
</script>

<style scoped lang="scss">

</style>
