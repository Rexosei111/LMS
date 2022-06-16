import { API } from "./Axios_init";

export const fetcher = async (endpoint) => {
  const { data } = await API.get(`${endpoint}`);
  return data;
};
