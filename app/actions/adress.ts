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

  return {address, reload: true};
}

export async function checkAddress() {
  const session = await auth();
  if (!session) {
    throw new Error("SignInRequired");
  }

  const user = await db.user.findUnique({where: {id: session?.user.id}});
  if (!user) {
    throw new Error("UserNotFound");
  }

  const address = await db.address.findMany({
    where: {customerId: user.id},
  });

  if (!address || address.length === 0) {
    throw new Error("NoAddressRegistered");
  }

  return address;
}

export async function editAddress(formData: AddressCreate) {
  const session = await auth();
  if (!session) {
    throw new Error("SignInRequired");
  }

  const user = await db.user.findUnique({where: {id: session?.user.id}});
  if (!user) {
    throw new Error("UserNotFound");
  }

  const address = await db.address.findMany({
    where: {customerId: user.id},
  });

  if (!address || address.length === 0) {
    throw new Error("NoAddressRegistered");
  }

  const updateAddress = await db.address.update({
    where: {id: address[0].id},
    data: {
      streetAdress: formData.streetAdress,
      zipCode: formData.zipCode,
      city: formData.city,
    },
  });

  return updateAddress;
}
