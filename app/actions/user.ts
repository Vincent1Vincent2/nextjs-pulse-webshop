"use server";

import {signOut} from "@/auth";

export default async function SignOutUser() {
  await signOut();
  return {success: true};
}
