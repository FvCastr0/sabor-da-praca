// lib/auth.ts
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

interface CustomUser {
  name: string;
  token: string;
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        name: { label: "Name", type: "text" },
        password: { label: "Password", type: "password" }
      },

      async authorize(credentials) {
        if (!credentials?.name || !credentials?.password) return null;

        try {
          const response = await fetch(
            `${process.env.BACKEND_URL}/auth/login`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                name: credentials.name,
                password: credentials.password
              })
            }
          );

          if (!response.ok) return null;
          const loginData = await response.json();
          const token = loginData.data.token;

          const userRes = await fetch(
            `${process.env.BACKEND_URL}/auth/profile`,
            {
              method: "GET",
              headers: { Authorization: `Bearer ${token}` }
            }
          );

          if (!userRes.ok) return null;
          const userData = await userRes.json();

          return {
            id: userData.id,
            name: userData.name,
            token
          };
        } catch {
          return null;
        }
      }
    })
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const customUser = user as unknown as CustomUser;
        token.accessToken = customUser.token;
        token.name = customUser.name;
      }
      return token;
    },

    async session({ session, token }) {
      if (token && session.user) {
        session.user.name = token.name;
        session.accessToken = token.accessToken;
      }
      return session;
    }
  },

  pages: {
    signIn: "/login"
  },

  session: {
    strategy: "jwt"
  },

  secret: process.env.NEXTAUTH_SECRET
};
