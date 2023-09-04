import axios from "axios";

export const AuthApi = axios.create({
  baseURL: "http://localhost:5555/v1/user",
});
