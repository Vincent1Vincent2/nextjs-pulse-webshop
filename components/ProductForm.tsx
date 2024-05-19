"use client";
import { getCategories } from "@/app/actions/category";
import { productCreate } from "@/app/actions/product";
import { ProductCreate, ProductCreateSchema } from "@/app/zodSchemas/product";
import { zodResolver } from "@hookform/resolvers/zod";
import { Category } from "@prisma/client";
import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";

const ProductForm = () => {
  const form = useForm<ProductCreate>({
    resolver: zodResolver(ProductCreateSchema),
  });
  const {
    formState: { errors },
    control,
  } = form;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "categories",
  });

  const [categories, setCategories] = useState<Category[] | null>(null);

  useEffect(() => {
    async function fetchCategories() {
      const fetchedCategories = await getCategories();
      setCategories(fetchedCategories);
    }
    fetchCategories();
  }, []);

  const handleSubmit = async (data: ProductCreate) => {
    await productCreate(data);
    form.reset();
  };

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)}>
      <input {...form.register("name")} type="text" placeholder="Name" />
      {errors.name && <span>{errors.name.message}</span>}

      <input
        {...form.register("description")}
        type="text"
        placeholder="Description"
      />
      {errors.description && <span>{errors.description?.message}</span>}

      <input {...form.register("price")} type="number" placeholder="Price" />
      {errors.price && <span>{errors.price?.message}</span>}

      <input {...form.register("image")} type="text" placeholder="Image URL" />
      {errors.image && <span>{errors.image?.message}</span>}

      <div>
        {fields.map((field, index) => (
          <div key={field.id}>
            <select
              {...form.register(`categories.${index}.name` as const)}
              defaultValue=""
            >
              <option value="">Select a category</option>
              {categories?.map((category) => (
                <option key={category.id} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
            <button type="button" onClick={() => remove(index)}>
              Remove
            </button>
          </div>
        ))}
        <button type="button" onClick={() => append({ name: "" })}>
          Add Category
        </button>
      </div>
      {errors.categories && <span>{errors.categories.message}</span>}

      <button type="submit">Submit</button>
    </form>
  );
};

export default ProductForm;
