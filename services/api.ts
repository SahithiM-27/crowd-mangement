import axios from "axios";

const api = axios.create({
  baseURL: "https://hiring-dev.internal.kloudspot.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;


