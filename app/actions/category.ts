"use server";

import {db} from "@/prisma/db";
import {CategoryCreate} from "../zodSchemas/category";

export async function saveCategory(formData: CategoryCreate) {
  await db.category.create({
    data: {
      name: formData.name,
      slug: formData.name,
    },
  });
}

export async function getCategories() {
  return await db.category.findMany();
}

export async function getCategoryBySlug(name: string) {
  return await db.category.findUnique({
    where: {
      name,
    },
  });
}
