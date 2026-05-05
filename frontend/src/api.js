import axios from "axios";

// 👇 ye line Vercel env se URL uthay gi
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// 👇 token auto attach (agar login system hai)
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;