"use server";

import { db } from "@/prisma/db";
import { ProductCreate } from "../zodSchemas/product";

export async function SaveProduct(formData: ProductCreate) {
  await db.product.create({
    data: {
      name: formData.name,
      price: formData.price,
    },
  });
}
