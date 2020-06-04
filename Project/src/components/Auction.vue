<template>
  <div class="auction" v-if="auction !== null">
    <div v-if="editMode === false">
      <AuctionInfo :auction="auction" />
      <div v-if="editable === true">
        <button @click="edit()" value="Edit" />
      </div>
    </div>
    <div v-else-if="editMode === true">
      <AuctionEditForm :inheritedAuction="auction" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import AuctionInfo from "./AuctionInfo";
import AuctionEditForm from "./AuctionEditForm";

export default {
  name: "Auction",
  props: ["auction"],
  components: {
    AuctionInfo,
    AuctionEditForm
  },
  data () {
    return {
      editMode: false
    };
  },
  computed: {
    ...mapGetters(["user", "isAuthenticated"]),
    editable: function () {
      return this.isAuthenticated === true && this.auction.username === this.user.username && this.auction.status === "NEW";
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
