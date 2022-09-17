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
Axios.interceptors.response.use();
export default Axios;
