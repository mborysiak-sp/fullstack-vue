import io from "socket.io-client";

const state = {
  socket: {}
};

const getters = {
  socket: state.socket
};

const actions = {
  setSocket ({ commit }) {
    commit("set_socket", io());
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
