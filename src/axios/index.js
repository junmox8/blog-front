import axios from "axios";

const Axios = axios.create({
  timeout: 4000,
});
Axios.interceptors.request.use((request) => {
  request.headers = {
    ...request.headers,
    authorization: "Bearer " + localStorage.getItem("token") || "",
  };
  return request;
});
Axios.interceptors.response.use(
  (responce) => {
    if (responce.data.errorMsg == "请重新登录") {
      location.replace("http://localhost:8080/login");
    }
    return responce;
  },
  (error) => {
    console.log(error);
  }
);
export default Axios;
