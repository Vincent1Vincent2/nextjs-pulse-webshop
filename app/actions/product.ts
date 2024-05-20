"use server";
import { db } from "@/prisma/db";
import { Product } from "@prisma/client";
import { cookies } from "next/headers";
import { ProductCreate } from "../zodSchemas/product";

export async function productCreate(formData: ProductCreate) {
  const email = cookies().get("name");
  const user = await db.user.findUnique({ where: { email: email?.value } });
  if (user?.isAdmin !== true) {
    throw new Error("User not Authorized");
  }

  const existingCategories = await db.category.findMany({
    where: {
      name: {
        in: formData.categories.map((c) => c.name),
      },
    },
  });

  const connectCategories = existingCategories.map((c) => ({ id: c.id }));
  const createCategories = formData.categories
    .filter((c) => !existingCategories.find((ec) => ec.name === c.name))
    .map((c) => ({ name: c.name }));

  const products = await db.product.create({
    data: {
      name: formData.name,
      description: formData.description,
      price: parseFloat(formData.price),
      image: formData.image,
      stock: formData.stock,
      categories: {
        connect: connectCategories,
        create: createCategories,
      },
    },
  });

  return products;
}

export async function productUpdate(
  formData: ProductCreate,
  id: number | undefined
) {
  if (!id) return;

  const existingCategories = await db.category.findMany({
    where: {
      name: {
        in: formData.categories.map((c) => c.name),
      },
    },
  });

  const connectCategories = existingCategories.map((c) => ({ id: c.id }));
  const createCategories = formData.categories
    .filter((c) => !existingCategories.find((ec) => ec.name === c.name))
    .map((c) => ({ name: c.name }));

  // Fetch the current categories of the product
  const currentProduct = await db.product.findUnique({
    where: { id: id },
    include: { categories: true },
  });

  // Determine which categories need to be disconnected
  const disconnectCategories = currentProduct?.categories
    .filter((c) => !formData.categories.find((fc) => fc.name === c.name))
    .map((c) => ({ id: c.id }));

  const products = await db.product.update({
    where: { id: id },
    data: {
      name: formData.name,
      description: formData.description,
      price: parseFloat(formData.price),
      image: formData.image,
      stock: formData.stock,
      categories: {
        disconnect: disconnectCategories,
        connect: connectCategories,
        create: createCategories,
      },
    },
  });

  return products;
}

export async function getCurrentProducts() {
  const products = await db.product.findMany({ where: { deleted: false } });

  return products;
}

export async function getProduct(id: number) {
  return await db.product.findUnique({
    where: { id: id },
    include: { categories: true },
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
