<template>
  <div class="user-panel">
    <button class="close-button" v-if="currentComponent !== null" @click="swapComponent(null)">Close</button>
    <div id="current-component" :is="currentComponent"></div>
    <div v-show="!currentComponent" v-for="component in componentsArray" v-bind:key="component.name">
      <button class="swap-button" @click="swapComponent(component)">{{component.name}}</button>
    </div>
  </div>
</template>

<script>
import AuctionForm from "@/components/AuctionForm";
import OwnedAuctions from "../components/OwnedAuctions.vue";
import BiddedAuctions from "../components/BiddedAuctions.vue";
import { mapGetters } from "vuex";

export default {
  name: "UserPanel",
  data: function () {
    return {
      currentComponent: null,
      componentsArray: [AuctionForm, OwnedAuctions, BiddedAuctions]
    };
  },
  computed: {
    ...mapGetters(["user"])
  },
  methods: {
    swapComponent (component) {
      this.currentComponent = component;
    }
  }
};
</script>

<style lang="scss" scoped>
.user-panel {
  //height: 70vh;
  //overflow: auto;
  .close-button {
    display: block;
    margin-left: auto;
    margin-right: auto;
  }
  // margin-top: 10vh;
  // margin-bottom: 10vh;
}
</style>
