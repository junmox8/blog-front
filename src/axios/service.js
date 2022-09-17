import Axios from "./index";
export const register = async (username, password) => {
  return Axios.post("/api/user/register", {
    username,
    password,
  });
};
export const login = async (username, password) => {
  return Axios.post("/api/user/login", {
    username,
    password,
  });
};
export const getTempSecret = async () => {
  return Axios.get("/api/upload/getTempSecret");
};
