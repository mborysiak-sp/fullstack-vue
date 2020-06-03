<template>
  <div class="user-panel">
    <h2>Hello {{user.username}} </h2>
    <div :is="currentComponent"></div>
    <div v-show="!currentComponent" v-for="component in componentsArray" v-bind:key="component.name">
      <button @click="swapComponent(component)">{{component.name}}</button>
    </div>
    <button v-if="currentComponent !== null" @click="swapComponent(null)">Close</button>
  </div>
</template>

<script>
import AuctionForm from "@/components/AuctionForm";
import AuctionEditForm from "@/components/AuctionEditForm";

import { mapGetters } from "vuex";

export default {
  name: "UserPanel",
  data: function () {
    return {
      currentComponent: null,
      componentsArray: [AuctionForm, AuctionEditForm]
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

<style>

</style>
