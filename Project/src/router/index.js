import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Register from "../views/Register.vue";
import UserPanel from "../views/UserPanel.vue";
import UserChatsView from "../views/UserChatsView.vue";
import store from "../store/store";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/register",
    name: "Register",
    component: Register
  },
  {
    path: "/userPanel",
    name: "UserPanel",
    component: UserPanel,
    meta: { requiresLogin: true }
  },
  {
    path: "/userChatsView",
    name: "UserChatsView",
    component: UserChatsView,
    meta: { requiresLogin: true }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  store.dispatch("setUser");
  if (to.matched.some(record => record.meta.requiresLogin) && store.getters.isAuthenticated !== true) {
    next("/register");
  } else {
    next();
  }
});

export default router;
