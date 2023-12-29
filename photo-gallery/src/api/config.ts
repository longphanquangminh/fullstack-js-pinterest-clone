import axios from "axios";
import { store } from "../main";
import { setLoading } from "../redux/spinnerSlice";
import { userLocalStorage } from "./localService";

const token = userLocalStorage.get()?.token;

export const configHeaders = () => {
  return {
    token,
  };
};

export const BASE_URL = import.meta.env.VITE_BASE_BACKEND_URL;
export const https = axios.create({
  baseURL: BASE_URL,
  headers: {
    ...configHeaders(),
  },
});

export const httpsNoLoading = axios.create({
  baseURL: BASE_URL,
  headers: {
    ...configHeaders(),
  },
});

https.interceptors.request.use(
  config => {
    store.dispatch(setLoading(true));
    return config;
  },
  err => {
    store.dispatch(setLoading(false));
    return Promise.reject(err);
  },
);

https.interceptors.response.use(
  res => {
    store.dispatch(setLoading(false));
    return res;
  },
  err => {
    store.dispatch(setLoading(false));
    return Promise.reject(err);
  },
);
