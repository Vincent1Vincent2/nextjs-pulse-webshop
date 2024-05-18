"use server";
import { db } from "@/prisma/db";
import { Product } from "@prisma/client";

export async function getCurrentProducts() {
  const products = await db.product.findMany({ where: { deleted: false } });

  return products;
}

export async function getProduct(id: number) {
  return await db.product.findUnique({
    where: { id: id },
  });
}

export async function deleteProduct(id: number) {
  try {
    await db.product.update({
      where: { id: id },
      data: { deleted: true },
    });
    console.log("Product marked as deleted.");
  } catch (error) {
    console.error("Error marking product as deleted:", error);
  }
}

export async function generateStaticParams() {
  const products = await db.product.findMany({});
  return products.map((product: Product) => ({
    product: product.id.toString(),
  }));
}
