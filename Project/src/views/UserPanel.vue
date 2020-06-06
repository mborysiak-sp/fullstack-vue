<template>
  <div class="user-panel">
    <button class="close-button" v-if="currentComponent !== null" @click="swapComponent(null)">Close</button>
    <div :is="currentComponent"></div>
    <div v-show="!currentComponent" v-for="component in componentsArray" v-bind:key="component.name">
      <button class="swap-button" @click="swapComponent(component)">{{component.name}}</button>
    </div>
  </div>
</template>

<script>
import AuctionForm from "@/components/AuctionForm";

import { mapGetters } from "vuex";
import UserAuctions from "../components/UserAuctions.vue";

export default {
  name: "UserPanel",
  data: function () {
    return {
      currentComponent: null,
      componentsArray: [AuctionForm, UserAuctions]
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

}
</style>
