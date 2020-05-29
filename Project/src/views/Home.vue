<template>
  <div class="home">
    <h2>Hello {{user.username}} </h2>
    <input type="button" @click="logout" value="Logout">
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "home",
  components: {
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
