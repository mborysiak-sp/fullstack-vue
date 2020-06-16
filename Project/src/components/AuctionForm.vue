<template>
  <div class="auction-form">
    <div class="element">
      <label>Name:</label>
      <input v-model="name" id="name" type="text" minlength="2" maxLength="32" placeholder="Name">
    </div>
    <div>
      <label>Price:</label>
      <input v-model="price" id="price" type="number" min="1" max="1000000" step="1" placeholder="Price">
    </div>
    <div class="element">
      <label>Auction description:</label>
      <input v-model="description" id="description" type="text" minLength="2" maxLength="128" placeholder="Description">
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
  </div>
</template>

<script>
import axios from "axios";
// import router from "../router";

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
      await axios.post(
        "/api/auction",
        auction,
        { withCredentials: true }
      )
        .then(() => {
          alert("Product created");
          this.$forceUpdate();
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
  padding-top: 5px;
  display: flex;
  height: 70vh;
  overflow: auto;
  flex-flow: column nowrap;
  justify-content: space-between;
  text-align: left;
  flex-grow: 1;
}
</style>
