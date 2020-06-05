import io from "socket.io-client";

const state = {
  socket: []
};

const getters = {
  socket: state => state.socket[]
};

const actions = {
  setSocket ({ commit }) {
    const s = io();
    commit("set_socket", s);
  }
};

const mutations = {
  set_socket (state, data) {
    state.socket = data;
  }
};

export default {
  state,
  actions,
  mutations,
  getters
};
