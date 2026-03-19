import axios from "axios";
import router from "../router";

const api = axios.create({
  baseURL: "http://localhost:8080/",
});

// Envia o token automaticamente em cada requisição
api.interceptors.request.use((config) => {
  const userData = JSON.parse(localStorage.getItem("user_data"));
  if (userData?.token) {
    config.headers.Authorization = `Bearer ${userData.token}`;
  }
  return config;
});

// Responde a erros 401 (Token expirado ou inválido no servidor)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("user_data");
      router.push("/login");
    }
    return Promise.reject(error);
  },
);

export default api;
