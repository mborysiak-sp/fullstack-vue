const state = {
  error: {}
};

const getters = {
  error: state => state.error
};

const actions = {
  logError ({ commit }, err) {
    commit("error_log", err);
  }
};

const mutations = {
  error_log (state, err) {
    state.error = err;
  }
};

export default {
  state,
  actions,
  mutations,
  getters
};
