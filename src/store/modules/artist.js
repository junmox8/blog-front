export default {
  namespaced: true,
  state: {
    text: "",
  },
  mutations: {
    setText(state, data) {
      state.text = data;
    },
  },
  actions: {
    setText(store, data) {
      store.commit("setText", data);
    },
  },
};
