"use server";
import { db } from "@/prisma/db";

export async function getProducts() {
  const products = await db.product.findMany({});

  return products;
}

export async function deleteProduct(id: number) {
  const products = await db.product.delete({ where: { id: id } });

  return products;
}
