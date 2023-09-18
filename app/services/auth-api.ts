import axios from "axios";

export const AuthApi = (cookie: string) =>
  axios.create({
    baseURL: process.env.NEXT_PUBLIC_AUTH_API_URL,
    headers: {
      Authorization: `Bearer ${cookie}`,
    },
  });

export interface FileProps {
  name: string;
  side: "server" | "client";
  code?: string;
}

export interface ProductProps {
  id: string;
  name: string;
  version: string;
}
