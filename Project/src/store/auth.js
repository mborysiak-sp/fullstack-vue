import axios from "axios";
// import passport from "passport";
// import router from "../router";
const state = {
  user: {},
  status: "",
  isAuthenticated: false,
  error: null
};

const getters = {
  user: state => state.user,
  authState: state => state.status,
  isAuthenticated: state => state.isAuthenticated,
  error: state => state.error
};

const actions = {
  login ({ commit }, user) {
    return new Promise((resolve, reject) => {
      commit("auth_request");
      axios.post(
        "/api/login",
        user,
        { headers: { "Content-Type": "application/json" }, withCredentials: true }
      )
        .then((resp) => {
          user = resp.data.user;
          commit("auth_success", user);
          resolve(resp);
        })
        .catch(err => {
          commit("auth_error", err);
          reject(err);
        });
    });
  },
  logout ({ commit }) {
    return new Promise((resolve, reject) => {
      commit("auth_request");
      axios.get("/api/logout", { withCredentials: true })
        .then((resp) => {
          commit("auth_logout");
          resolve(resp);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  getUser ({ commit }) {
    return new Promise((resolve, reject) => {
      commit("auth_request");
      axios.get("/api/user-status", { withCredentials: true })
        .then((resp) => {
          commit("auth_refresh", resp.data.user, resp.data.isAuthenticated);
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
};

const mutations = {
  auth_logout (state) {
    state.user = null;
    state.status = "";
  },
  auth_request (state) {
    state.error = null;
    state.status = "loading";
  },
  auth_success (state, user) {
    state.user = user;
    state.status = "success";
    state.error = null;
  },
  auth_error (state, err) {
    state.error = err;
  },
  auth_refresh (state, user, isAuthenticated) {
    state.user = user;
    state.isAuthenticated = isAuthenticated;
  }
};

export default {
  state,
  actions,
  mutations,
  getters
};
