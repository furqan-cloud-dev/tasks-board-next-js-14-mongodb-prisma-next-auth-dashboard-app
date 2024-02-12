// auth.ts
import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import Credentials from 'next-auth/providers/credentials';
import { User } from './lib/models';
import { PrismaClient } from '@prisma/client';
import { PrismaAdapter } from '@auth/prisma-adapter';
import google from 'next-auth/providers/google';
import axios from 'axios';


const prisma = new PrismaClient()


export const { handlers: { GET, POST }, auth, signIn, signOut, unstable_update } = NextAuth({
  // adapter: PrismaAdapter(prisma),
  // session: { strategy: "jwt" },
  ...authConfig,
  providers: [
    google({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
    }),
    Credentials({
      async authorize(credentials) {
        if (credentials.id && credentials.password) {
          // Add you backend code here
          // let loginRes = await backendLogin(credentials.id, credentials.password)
          try {
            const user = await prisma.user.findUnique({ where: { email: credentials.id } });
            // If no user is found, throw an error
            if (!user) {
              return null;
            }

            console.log({ user });

            // Step 2: Check if the password is correct
            const isPasswordValid = user.password === credentials.password;

            // If password does not match, throw an error
            if (!isPasswordValid) {
              return null;
            }


            let loginRes = {
              success: true,
              data: { user }
            }
            // Failed logging in
            if (!loginRes.success) return null;
            // Successful log in
            const userObject = {
              id: loginRes.data.user.id ?? '',
              name: loginRes.data.user.name ?? '',
              email: loginRes.data.user.email ?? '',
            } as User;
            return userObject;
          } catch (error: any) {
            console.log(error);
            throw new Error(error.message);
            // return null;
          }
        }
        return null;
      },
    }),

  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      return true;
      const response = await axios.post(
        process.env.NEXT_PUBLIC_API_BASE_URL + "/auth/userExists",
        { email: profile?.email }
      );
      if (response && response.data?.value === true) {
        return true;
      } else {
        const data = {
          firstName: profile?.given_name,
          lastName: profile?.family_name,
          email: profile?.email,
          profileUrl: profile?.picture,
        };

        if (account?.provider === 'google') {
          console.log("google");
        }
        const response = await axios.post(
          process.env.NEXT_PUBLIC_API_BASE_URL + "/auth/signup",
          data
        );
        return true;
      }
    },
    async session({ session, token }) {
      session.user = token.user as User
      return session;
    },
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.user = user;
      }
      // ***************************************************************
      // added code
      if (trigger === "update" && session) {
        token = { ...token, user: session }
        return token;
      };
      // **************************************************************
      return token;
    },
  },
});