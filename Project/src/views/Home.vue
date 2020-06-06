<template>
  <div class="home">
    <div class="auction-list">
      <Auctions />
    </div>
  </div>
</template>

<script>
import Auctions from "@/components/Auctions";

export default {
  name: "home",
  components: {
    Auctions
  }
};
</script>

<style scoped lang="scss">
.home {
  background-color:wheat;
  height: 100%;
  text-align: center;
  width: 75%;
  margin: auto;
  .auction-list {
    margin: auto;
    text-align: center;
    background-color: rgba(0,0,0,0.1);
  }
}
</style>
