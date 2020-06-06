<template>
  <div class="auction-form">
    <form>
      <input v-model="name" id="name" type="text" minlength="2" placeholder="Name">
      <input v-model="price" id="price" type="number" min="1" step="1" placeholder="Price">
      <input v-model="description" id="description" type="text" placeholder="Description">
      <select v-model="type" id="select" name ="select">
        <option value="BID">BID</option>
        <option value="BUY">BUY</option>
      </select>
      <div v-if="type === 'BID'">
        <input type="number" v-model="time" placeholder="time">
      </div>
      <input type="button" @click="create" value="Submit">
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "AuctionForm",
  data () {
    return {
      name: "",
      price: "",
      type: "",
      username: this.$store.getters.user.username,
      status: "NEW",
      description: "",
      time: ""
    };
  },
  methods: {
    async create () {
      const auction = {
        name: this.name,
        price: this.price,
        type: this.type,
        username: this.$store.getters.user.username,
        desciption: this.description,
        status: "NEW",
        time: this.time
      };
      await axios.post(
        "/api/auction",
        auction,
        { withCredentials: true }
      )
        .then(() => {
          console.log("Udało się");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
};
</script>

<style>

</style>
