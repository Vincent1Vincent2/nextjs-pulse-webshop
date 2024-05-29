"use server";

import {signOut} from "@/auth";

export default async function SignOutUser() {
  await signOut({redirect: true, redirectTo: "/"});

  return {success: true};
}

// export async function handleSignIn(providerId: string, callbackUrl: string) {
//   await signIn(providerId, {redirectTo: callbackUrl, redirect: true});
// }
