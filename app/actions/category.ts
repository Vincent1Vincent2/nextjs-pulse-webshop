"use server";

import {db} from "@/prisma/db";
import {CategoryCreate} from "../zodSchemas/category";

export async function saveCategory(formData: CategoryCreate) {
  await db.category.create({
    data: {
      name: formData.name,
    },
  });
}

export async function getCategories() {
  const categories = await db.category.findMany();
  return categories;
}
