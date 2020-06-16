import io from "socket.io-client";

const state = {
  emitter: {}
};

const getters = {
  emitter: state => state.emitter
};

const actions = {
  setEmitter ({ commit }) {
    const emitter = io({ transports: ["websocket"] });
    // console.dir(emitter);
    commit("emitter_set", emitter);
  }
};

const mutations = {
  emitter_set (state, emitter) {
    state.emitter = emitter;
  }
};

export default {
  state,
  actions,
  mutations,
  getters
};
