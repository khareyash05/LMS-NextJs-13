import { prisma } from "db";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { type DefaultSession, type NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google"

declare module "next-auth" {
    interface Session extends DefaultSession {
      user: {
        id: string;
        email: string;
        password: string;
      } & DefaultSession["user"];
    }
}
export const authOptions: NextAuthOptions = {
    callbacks: {
      session({ session, user }) {
        if (session.user) {
          session.user.id = user.id;
          session.user.email = user.email;
        }
        return session;
      },
    },
    adapter: PrismaAdapter(prisma),
    providers: [
        GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID as string,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      }),
    ],
};