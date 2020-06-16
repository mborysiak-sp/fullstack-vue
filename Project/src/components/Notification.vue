<template>
  <div class="notification">
    {{ text }}
    <button @click="close()">Ok</button>
  </div>
</template>

<script>
export default {
  name: "Notification",
  props: "text",
  methods: {
    close () {
      this.$destroy();
    }
  }
};
</script>

<style>

</style>
