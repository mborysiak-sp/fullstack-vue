<template>
  <div class="auction-form">
    <form>
      <div class="element">
        <label>Name:</label>
        <input v-model="name" id="name" type="text" minlength="2" placeholder="Name">
      </div>
      <div>
        <label>Price:</label>
        <input v-model="price" id="price" type="number" min="1" step="1" placeholder="Price">
      </div>
      <div class="element">
        <label>Auction description:</label>
        <input v-model="description" id="description" type="text" placeholder="Description">
      </div>
      <div class="element">
        <label>Type:</label>
        <select v-model="type" id="select" name ="select">
          <option value="BID">BID</option>
          <option value="BUY">BUY</option>
        </select>
      </div>
      <div class="element" v-if="type === 'BID'">
        <label>Ending date:</label>
        <input type="date" v-model="date" placeholder="date">
      </div>
      <div class="element">
        <label>Start now:</label>
        <input type="checkbox" v-model="status" true-value="ONGOING" false-value="NEW">
      </div>
      <div class="element">
        <input type="button" @click="create()" value="Submit">
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import router from "../router";

export default {
  name: "AuctionForm",
  data () {
    return {
      name: "",
      price: "",
      type: "",
      username: this.$store.getters.user.username,
      status: "",
      description: "",
      date: ""
    };
  },
  methods: {
    async create () {
      const auction = {
        name: this.name,
        price: this.price,
        type: this.type,
        username: this.$store.getters.user.username,
        description: this.description,
        status: this.status,
        date: this.date
      };
      console.dir(auction);
      // const start = document.getElementById("start");
      // if (start.checked) {
      //   auction.status = "ONGOING";
      // }
      await axios.post(
        "/api/auction",
        auction,
        { withCredentials: true }
      )
        .then(() => {
          alert("Product created");
          router.push("Home");
        })
        .catch((err) => {
          alert(err);
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.auction-form {
  form {
    padding-top: 5px;
    .element {
      float: left;
    }
  }
}
</style>
