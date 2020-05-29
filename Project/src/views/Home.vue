<template>
  <div class="home">
    <h2>Hello {{user.username}} </h2>
    <input type="button" @click="logout" value="Logout">
    <Auctions />
    <AuctionForm />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Auctions from "@/components/Auctions";
import AuctionForm from "@/components/AuctionForm";

export default {
  name: "home",
  components: {
    Auctions,
    AuctionForm
  },
  methods: {
    ...mapActions(["logout"])
  },
  computed: {
    ...mapGetters(["user"])
  },
  logout () {
    this.logout()
      .then(() => {
        this.$swal("Logged out", "Logged", "success");
      })
      .catch((error) => {
        const message = error.response.data.message;
        this.$swal("Oh ho", `${message}`, "error");
      });
  }
};
</script>
