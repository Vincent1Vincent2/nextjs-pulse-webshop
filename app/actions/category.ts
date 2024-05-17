"use server";

import { db } from "@/prisma/db";
import { CategoryCreate } from "../zodSchemas/category";

// Function för att spara category och
export async function saveCategory(formData: CategoryCreate) {
  const category = await db.category.create({
    data: {
      name: formData.name,
    },
  });

  // om product id matchar category
  if (formData.productIds && formData.productIds.length > 0) {
    // Connect the category with each product
    await Promise.all(
      formData.productIds.map(async (productId) => {
        await db.category.create({
          data: {
            name: category.name,
          },
        });
      })
    );
  }

  return category;
}
