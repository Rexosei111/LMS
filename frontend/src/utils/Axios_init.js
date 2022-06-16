import axios from "axios";

export const API = axios.create({
  baseURL: "https://kyei.pythonanywhere.com/api/",
});
