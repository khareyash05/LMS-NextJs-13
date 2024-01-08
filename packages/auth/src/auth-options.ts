import { prisma } from "db";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { type DefaultSession, type NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google"
import GitHubProvider from "next-auth/providers/github";
import SlackProvider from "next-auth/providers/slack";

/*
  This declares a module augmentation for NextAuth.js, extending the Session type. 
  It adds a user property to the session with specific properties like id, email, and password.

  export interface DefaultSession { (from nextauth)
    user?: {
      name?: string | null
      email?: string | null
      image?: string | null
    }
    expires: ISODateString
  }
*/
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
    // Adapters allow Next Auth to connect with Prisma client
    adapter: PrismaAdapter(prisma),
    providers: [
        GoogleProvider({
          clientId: process.env.GOOGLE_CLIENT_ID as string,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
        }),
        GitHubProvider({
          clientId: process.env.GITHUB_ID as string,
          clientSecret: process.env.GITHUB_SECRET as string
        }),
        SlackProvider({
          clientId: process.env.SLACK_CLIENT_ID as string,
          clientSecret: process.env.SLACK_CLIENT_SECRET as string
        })
    ],
};