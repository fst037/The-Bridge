import axios from "axios";

const authAxios = axios.create({
  baseURL: import.meta.env.BASE_URL || "http://localhost:8080",
  timeout: 5000,
});

authAxios.interceptors.request.use((request) => {
  const authUser = localStorage.getItem("bridge-user");
  if (authUser) {
    request.headers.Authorization = JSON.parse(authUser);
  }
  return request;
});

export default authAxios;
