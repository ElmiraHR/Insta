// import axios from "axios";

// const base_url = "http://localhost:5005/api"; // development
// const base_url_prod = "https://be-social-topaz.vercel.app/api";

// //
// export const $api = axios.create({ baseURL: base_url || base_url_prod });

// $api.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token"); // ???
//   config.headers.Authorization = token ? `Bearer ${token}` : "";
//   return config;
// });
import axios from "axios";

const base_url = "http://localhost:5005/api";

export const $api = axios.create({ baseURL: base_url });

$api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // ???
  config.headers.Authorization = token ? `Bearer ${token}` : "";
  return config;
});