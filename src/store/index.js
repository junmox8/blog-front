import { createStore } from "vuex";
import User from "./modules/user";
import Artist from "./modules/artist";
import Background from "./modules/background";
import createPersistedState from "vuex-persistedstate";
export default createStore({
  modules: {
    User,
    Artist,
    Background,
  },
  plugins: [
    createPersistedState({
      storage: window.sessionStorage,
    }),
  ],
});
