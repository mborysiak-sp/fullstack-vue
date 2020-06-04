import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/store";
import VueSwal from "vue-swal";
// import socketio from "socket.io";
// import VueSocketIO from "vue-socket.io";

// export const SocketInstance = socketio("https://localhost:5000");

// Vue.use(VueSocketIO, SocketInstance);
Vue.config.productionTip = false;
Vue.use(VueSwal);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
