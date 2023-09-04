import axios from "axios";

export const AuthApi = axios.create({
  baseURL: process.env.AUTH_API_URL,
});
