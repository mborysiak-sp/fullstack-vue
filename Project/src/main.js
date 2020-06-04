import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/store";
import VueSwal from "vue-swal";
import socketio from "socket.io";
import VueSocketIO from "vue-socket.io";

Vue.config.productionTip = false;
export const SocketInstance = socketio("https://localhost:5000");

Vue.use(VueSwal);
Vue.use(VueSocketIO, SocketInstance);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
