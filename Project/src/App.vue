<template>
    <div class="app">
      <Navbar />
      <router-view />
    </div>
</template>

<script>
import Navbar from "@/components/Navbar";
// import Notification from "@/components/Notification";
import { mapActions, mapGetters } from "vuex";
// import Vue from "vue";
// const Classs = Vue.extend(Notification);
// const instance = new Classs();
// instance.$mount();

export default {
  name: "App",
  components: {
    Navbar
  },
  computed: {
    ...mapGetters(["emitter", "user"])
  },
  methods: {
    ...mapActions(["setUser", "setEmitter"])
    // join () {
    //   if (this.isAuthenticated) {
    //     this.emitter.emit("join", { _id: this.user.username, username: this.user.username });
    //   }
    // }
  },
  created () {
    this.setUser();
    this.setEmitter();
    // this.emitter.emit("join", {
    //   _id: this.user.username,
    //   username: this.user.username
    // });
    console.log(this.emitter);
    this.emitter.on("over_bidded", (cb) => {
      console.log("przechwyciłem emita");
      if (cb.username === this.user.username) {
        alert(`You were over bidded in auction: ${cb._id}`);
        // this.$refs.container.appendChild(instance.$el);
        // this.$refs.container.appendChild(new this.c());
      }
    });
  }
};
</script>

<style lang="scss">
body {
  overflow: hidden;
  ::-webkit-scrollbar
  {
    width: 1vw;
    height: 1vh;
  }

  ::-webkit-scrollbar-track
  {
    background: #05ffa1
  }

  ::-webkit-scrollbar-thumb
  {
    background: #ff71ce;
  }
}
.app {
  padding-top: 0;
  margin-top: 0;
  top: 0;
  height: 100vh;
  font-family: Helvetica, Arial, sans-serif;
  background: linear-gradient(to top, #01cdfe 0%,#b967ff 100%);
}
button {
  background-color: #fffb96;
  font-weight: 600;
  text-align: center;
  padding: 5px;
  border-radius: 6px;
}

</style>
