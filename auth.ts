import {PrismaAdapter} from "@auth/prisma-adapter";
import NextAuth, {DefaultSession} from "next-auth";
import type {Provider} from "next-auth/providers";
import Apple from "next-auth/providers/apple";
import Discord from "next-auth/providers/discord";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import {db} from "./prisma/db";

const providers: Provider[] = [GitHub, Google, Discord, Apple];

export const {handlers, signIn, signOut, auth} = NextAuth({
  adapter: PrismaAdapter(db),
  providers,
  pages: {
    signIn: "/auth/signin",
  },
});

export const providerMap = providers.map(provider => {
  if (typeof provider === "function") {
    const providerData = provider();
    return {id: providerData.id, name: providerData.name};
  } else {
    return {id: provider.id, name: provider.name};
  }
});

declare module "next-auth" {
  interface User {}

  interface Account {}

  interface Session {
    user: {
      id: string;
      email: string;
      isAdmin: boolean;
    } & DefaultSession["user"];
  }
}
