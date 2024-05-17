"use server";

import { db } from "@/prisma/db";
import { cookies } from "next/headers";

export async function authenticateUser() {
  const email = cookies().get("name");

  if (!email) {
    return null;
  }
  const user = await db.user.findUnique({ where: { email: email?.value } });

  if (user) {
    const authUser = {
      id: user.id,
      firstName: user.firstName,
      admin: user.isAdmin,
    };
    return authUser;
  } else {
    return null;
  }
}
