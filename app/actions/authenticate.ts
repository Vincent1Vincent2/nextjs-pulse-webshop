"use server";

import {auth} from "@/auth";
import {db} from "@/prisma/db";

export async function authenticateUser() {
  const session = await auth();
  const user = await db.user.findUnique({where: {id: session?.user.id}});
  if (!user) {
    throw new Error("User not found");
  }
  return user;
}
