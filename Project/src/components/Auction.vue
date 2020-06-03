<template>
  <div class="auction" v-if="auction !== null">
    <div v-if="!editModeOn">
    <div v-if="owner">
      <button id="btn-edit" @click="editMode()" value="edit">
    </div>
    <div v-if="editModeOn">
      <AuctionEditForm />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Auction",
  props: ["auction"],
  computed: {
    ...mapGetters(["user"]),
    editable () {
      return this.user.isAuthenticated && this.auction.username === this.user.username && this.auction.status === "New";
    }
  },
  methods: {
    edit () {
      this.editMode = !this.editMode;
    }
  }
};
</script>

<style>

</style>
