import { createStore } from "vuex";
import User from "./modules/user";
import Artist from "./modules/artist";
export default createStore({
  modules: {
    User,
    Artist,
  },
});
