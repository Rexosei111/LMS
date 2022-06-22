import axios from "axios";

export const API = axios.create({
  baseURL:
    process.env.REACT_APP_NODE_ENV === "production"
      ? "https://kyei.pythonanywhere.com/api/"
      : "http://localhost:8000/api/",
});
