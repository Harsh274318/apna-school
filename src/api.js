

import axios from "axios";


// console.log(url)
const api = axios.create({
  baseURL: "http://localhost:7001/api",
  // headers: {
  //   "Content-Type": "application/json",
  // },
  // url: import.meta.env.VITE_BACKEND_URL

});
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  // console.log(token)
  return config;
});

export default api;
// https://student-backend-tx66.onrender.com/api
// http://localhost:7001/api",
