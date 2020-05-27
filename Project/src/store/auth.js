import axios from "axios";
// import router from "../router";
const state = {
  user: {},
  status: "",
  error: null
};

const getters = {
  user: state => state.user,
  authState: state => state.status,
  error: state => state.error
};

const actions = {
  login ({ commit }, user) {
    return new Promise((resolve, reject) => {
      commit("auth_request");
      axios.post("http://localhost:" + process.env.PORT + "/api/login", user)
        .then(res => {
          user = res.data.user;
          commit("auth_success", user);
          resolve();
        })
        .catch(err => {
          commit("auth_error", err);
          reject(err);
        });
    });
  }
};

const mutations = {
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
  }
};

export default {
  state,
  actions,
  mutations,
  getters
};
