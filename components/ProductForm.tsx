"use client";

import { SaveProduct } from "@/app/actions/products";
import { ProductCreate, ProductCreateSchema } from "@/app/zodSchemas/product";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export default function ProductForm() {
  const form = useForm<ProductCreate>({
    resolver: zodResolver(ProductCreateSchema),
  });

  const {
    formState: { errors },
  } = form;

  const handleSubmit = async (data: ProductCreate) => {
    await SaveProduct(data);
    form.reset();
  };

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)}>
      <input
        {...form.register("name")}
        type="text"
        placeholder="Product Name"
      />
      {errors.name && <span>{errors.name.message}</span>}
      <input {...form.register("price")} type="number" placeholder="Price" />
      {/* {errors.price && <span>{errors.price.message}</span>} */}
      <button>Save Product</button>
    </form>
  );
}
