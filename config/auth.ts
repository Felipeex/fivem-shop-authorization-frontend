import DiscordProvider from "next-auth/providers/discord";
import type { AuthOptions } from "next-auth";
import { sign, verify } from "jsonwebtoken";
import { AuthApi } from "@/app/services/auth-api";

export const authOptions: AuthOptions = {
  session: {
    strategy: "jwt",
  },
  jwt: {
    encode: async ({ secret, token }) => {
      const encodedToken = sign(token!, secret);
      return encodedToken;
    },
    decode: async ({ secret, token }) => {
      try {
        const decoded: any = verify(token!, secret);
        if (decoded) return decoded;
        else null;
      } catch (error) {
        console.log(error);
      }
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID as string,
      clientSecret: process.env.DISCORD_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      await AuthApi.post("", { id: user.id, name: user.name });
      return true;
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
    jwt: async ({ user, token }) => {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
  },
};
