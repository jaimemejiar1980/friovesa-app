import { API_URL } from "../constants/wordpress";
import axios from "axios";

const axiosInstanceSetup = {
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
};

export const api = axios.create(axiosInstanceSetup);

export const apiPrivate = axios.create(axiosInstanceSetup);
