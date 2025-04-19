import type { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth";
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
          const response = await fetch("http://localhost:3001/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name: credentials.name,
              password: credentials.password
            })
          });

          if (!response.ok) {
            console.error("Erro na resposta do servidor:", response.statusText);
            return null;
          }

          const loginData = await response.json();

          if (!response.ok || !loginData.data.token) return null;

          const token = loginData.data.token;

          const userRes = await fetch("http://localhost:3001/auth/profile", {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`
            }
          });

          if (!userRes.ok) return null;
          const userData = await userRes.json();

          return {
            id: userData.id,
            name: userData.name,
            token
          };
        } catch (error) {
          console.error("Erro ao autenticar:", error);
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
    signIn: "/"
  },

  session: {
    strategy: "jwt"
  },

  secret: process.env.NEXTAUTH_SECRET
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
