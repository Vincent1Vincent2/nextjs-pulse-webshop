"use server";

import {signIn, signOut} from "@/auth";

export default async function SignOutUser() {
  await signOut();
  return {success: true};
}

export async function handleSignIn(providerId: string, callbackUrl: string) {
  await signIn(providerId, {redirectTo: callbackUrl, redirect: true});
}
