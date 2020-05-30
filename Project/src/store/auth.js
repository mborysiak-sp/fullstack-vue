import axios from "axios";

const state = {
  user: {},
  isAuthenticated: false
};

const getters = {
  user: state => state.user,
  isAuthenticated: state => state.isAuthenticated
};

const actions = {
  login ({ commit }, user) {
    return new Promise((resolve, reject) => {
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
          reject(err);
        });
    });
  },
  logout ({ commit }) {
    return new Promise((resolve, reject) => {
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
  setUser ({ commit }) {
    return new Promise((resolve, reject) => {
      axios.get("/api/user_status", { withCredentials: true })
        .then((resp) => {
          commit("auth_refresh", resp.data);
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
    state.isAuthenticated = false;
  },
  auth_success (state, user) {
    state.user = user;
    state.isAuthenticated = true;
    state.error = null;
  },
  auth_refresh (state, data) {
    state.user = data.user;
    state.isAuthenticated = data.isAuthenticated;
  }
};

export default {
  state,
  actions,
  mutations,
  getters
};
