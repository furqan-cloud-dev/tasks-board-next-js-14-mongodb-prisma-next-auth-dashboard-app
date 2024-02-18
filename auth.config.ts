// src/auth.config.ts
import type { NextAuthConfig } from 'next-auth';
import credentials from 'next-auth/providers/credentials';
import google from 'next-auth/providers/google';
import { PrismaAdapter } from "@auth/prisma-adapter"
import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient()


export const authConfig = {
  adapter: PrismaAdapter(prisma),
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      // Check if the user is authenticated
      const isLoggedIn = !!auth?.user;
      // Initialize protected routes
      // Here, all routes except the login and signup page is protected
      const isOnProtected = !(nextUrl.pathname.startsWith('/login') || nextUrl.pathname.startsWith('/signup'));

      if (isOnProtected) {
        if (isLoggedIn) return true;
        return false; // redirect to /login
      } else if (isLoggedIn) {
        // redirected to homepage
        return Response.redirect(new URL('/dashboard', nextUrl));
      }
      return true;
    },
  },
  providers: [google, credentials],
} satisfies NextAuthConfig;