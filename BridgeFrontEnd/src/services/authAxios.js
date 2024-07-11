import axios from "axios";

const authAxios = axios.create({
  baseURL: "http://localhost:8080",
  timeout: 20000,
});

authAxios.interceptors.request.use((request) => {
  const authUser = JSON.parse(localStorage.getItem("bridge-user"));
  request.headers.Authorization = authUser.token;
  return request;
});

export default authAxios;
