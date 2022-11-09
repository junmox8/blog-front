export default {
  namespaced: true,
  state: {
    token: "",
    userId: 0,
  },
  mutations: {
    setToken(state, data) {
      state.token = data;
    },
    setUserId(state, data) {
      state.userId = data;
    },
  },
  actions: {
    setToken(store, data) {
      store.commit("setToken", data);
    },
    setUserId(store, data) {
      store.commit("setUserId", data);
    },
  },
};
