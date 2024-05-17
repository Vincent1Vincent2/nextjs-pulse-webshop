"use server";
import { db } from "@/prisma/db";
import { cookies } from "next/headers";
import { AddressCreate } from "../zodSchemas/address";

export async function addressCreate(formData: AddressCreate) {
  const email = cookies().get("name");

  const user = await db.user.findUnique({ where: { email: email?.value } });
  if (!user) {
    throw new Error("User not found");
  }

  const address = await db.address.create({
    data: {
      streetAdress: formData.streetAdress,
      zipCode: formData.zipCode,
      city: formData.city,
    },
  });
  return address;
}