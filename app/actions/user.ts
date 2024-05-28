"use server";

import {signOut} from "@/auth";

export default async function SignOutUser() {
  await signOut({redirect: true, redirectTo: "/"});

  return {success: true};
}
