import axios from "axios";
import service from "../service/localStorage";

const { getToken, clearToken } = service;

axios.defaults.baseURL = "http://localhost:8000/";

axios.interceptors.request.use(
  (config) => {
    if (getToken()) config.headers.Authorization = `Bearer ${getToken()}`;
    return config;
  },
  (err) => Promise.reject(err)
);

axios.interceptors.response.use(
  (response) => response,
  (err) => {
    if (err.response.status === 401) {
      clearToken();
      alert("You are unauthorize");
      window.location.assign("/");
      return;
    }
    return Promise.reject(err);
  }
);

export default axios;
