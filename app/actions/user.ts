"use server";

import { db } from "@/prisma/db";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";
import { UserCreate, UserLogin } from "../zodSchemas/user";

export async function registerUser(formData: UserCreate) {
  const hashedPassword = await bcrypt.hash(formData.password, 10);

  await db.user.create({
    data: {
      email: formData.email,
      password: hashedPassword,
      firstName: formData.firstName,
      lastName: formData.lastName,
      phoneNumber: formData.phoneNumber,
    },
  });
}

export async function loginUser(formData: UserLogin) {
  const user = await db.user.findUnique({ where: { email: formData.email } });

  if (!user) {
    console.error("No user found, check email");
  }
  const hashedPassword = user?.password;

  const isMatch = await bcrypt.compare(formData.password, hashedPassword!);

  if (isMatch) {
    cookies().set({
      name: "name",
      value: user!.email,
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
      httpOnly: true,
      sameSite: "strict",
    });
  } else {
    console.error("Not Authorized, invalid password");
  }
}

export async function logoutUser() {
  cookies().set({
    name: "name",
    value: "",
    path: "/",
    maxAge: -1,
    httpOnly: true,
    sameSite: "strict",
  });

  return { message: "Logged out successfully" };
}
