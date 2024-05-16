"use client";
import { saveCategory } from "@/app/actions/category";
import {
  CategoryCreate,
  CategoryCreateSchema,
} from "@/app/zodSchemas/category";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export default function CategoryForm() {
  const form = useForm<CategoryCreate>({
    resolver: zodResolver(CategoryCreateSchema),
  });

  const {
    formState: { errors },
  } = form;

  const handleSubmit = async (data: CategoryCreate) => {
    await saveCategory(data);
    form.reset();
  };

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)}>
      <input {...form.register("name")} type="text" placeholder="Category" />
      {errors.name && <span>{errors.name.message}</span>}
      <button>Save Category</button>
    </form>
  );
}
