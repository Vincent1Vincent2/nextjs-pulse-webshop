"use server";
import {auth} from "@/auth";
import {db} from "@/prisma/db";
import {AddressCreate} from "../zodSchemas/address";

export async function addressCreate(formData: AddressCreate) {
  const session = await auth();
  const user = await db.user.findUnique({where: {id: session?.user.id}});
  if (!user) {
    throw new Error("User not found");
  }

  const address = await db.address.create({
    data: {
      customerId: user.id,
      streetAdress: formData.streetAdress,
      zipCode: formData.zipCode,
      city: formData.city,
    },
  });
  return address;
}

export async function checkAddress() {
  const session = await auth();
  const user = await db.user.findUnique({where: {id: session?.user.id}});
  if (!user) {
    throw new Error("User not found");
  }

  const address = await db.address.findMany({
    where: {customerId: user.id},
  });

  if (address === undefined || address.length < 0) {
    console.log("Register Address");
  }

  return address;
}
