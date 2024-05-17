"use client";

import { SaveProduct } from "@/app/actions/products";
import { ProductCreate, ProductCreateSchema } from "@/app/zodSchemas/product";
import { zodResolver } from "@hookform/resolvers/zod";
import { Category } from "@prisma/client";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function ProductForm() {
  const form = useForm<ProductCreate>({
    resolver: zodResolver(ProductCreateSchema),
  });

  const [categories, setCategories] = useState<Category[]>([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductCreate>({
    resolver: zodResolver(ProductCreateSchema),
  });

  const onSubmit = async (data: ProductCreate) => {
    await SaveProduct(data);
    form.reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("name")} type="text" placeholder="Product Name" />
      {errors.name && <span>{errors.name.message}</span>}

      <input {...register("price")} type="number" placeholder="Price" />
      {/* {errors.price && <span>{errors.price.message}</span>}  */}

      <select {...register("categoryId")} defaultValue="">
        <option value="" disabled>
          Select a category
        </option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>

      <button type="submit">Save Product</button>
    </form>
  );
}
