"use server";

import { db } from "@/prisma/db";
import { cookies } from "next/headers";

export async function authenticateUser() {
  const email = cookies().get("name");

  const user = await db.user.findUnique({ where: { email: email?.value } });

  if (user) {
    const authUser = {
      name: user.firstName,
      isAdmin: user.admin,
    };
    return authUser;
  }
}
