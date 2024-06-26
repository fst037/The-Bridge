import axios from "axios";

const authAxios = axios.create({
  baseURL: "http://localhost:8080",
  timeout: 5000,
});

authAxios.interceptors.request.use((request) => {
  const authUser = JSON.parse(localStorage.getItem("bridge-user"));
  console.log("Auth User:", authUser);
  console.log("Token:", authUser.token);
  request.headers.Authorization = authUser.token;
  return request;
});

export default authAxios;
