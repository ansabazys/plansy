import clientPromise from "@/lib/mongodb";
import DBConnect from "@/lib/mongoose";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import NextAuth, { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import User from "@/models/User";

export const authOptions: NextAuthOptions = {
  adapter: MongoDBAdapter(clientPromise, {
    databaseName: "kanban",
    collections: {
      Users: "users", // you can rename if you want
      Sessions: "sessions",
      Accounts: "accounts",
      VerificationTokens: "verificationTokens",
    },
  }),

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),

    Credentials({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await DBConnect();
        let user = await User.findOne({ email: credentials?.email });

        if (!user) {
          const hashedPassword = await bcrypt.hash(credentials?.password!, 10);
          user = await User.create({    
            email: credentials?.email,
            username: credentials?.username,
            password: hashedPassword,
          });
        }

        const isValid = await bcrypt.compare(
          credentials!.password,
          user.password
        );

        console.log(user)

        if (!isValid) return null;

        return {
          id: user._id.toString(),
          username: user.username,
          email: user.email,
        };
      },
    }),
  ],

  session: { strategy: "jwt" as const },

  callbacks: {
    async session({ session, token }) {
      session.user.id = token.sub!;
      return session;
    },
    async redirect({url, baseUrl}) {
        return "/"
    }
  },

  pages: {
    signIn: "/login",
  },
};

// REQUIRED for Next.js App Router:
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
