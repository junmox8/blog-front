import { createStore } from "vuex";
import User from "./modules/user";
import Artist from "./modules/artist";
import Background from "./modules/background";
export default createStore({
  modules: {
    User,
    Artist,
    Background,
  },
});
