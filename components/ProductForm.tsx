"use client";
import {getCategories} from "@/app/actions/category";
import {productCreate} from "@/app/actions/product";
import {ProductCreate, ProductCreateSchema} from "@/app/zodSchemas/product";
import {zodResolver} from "@hookform/resolvers/zod";
import {Category} from "@prisma/client";
import {XIcon} from "lucide-react";
import {useEffect, useState} from "react";
import {useFieldArray, useForm} from "react-hook-form";
import {toast} from "./ui/use-toast";

const ProductForm = () => {
  const form = useForm<ProductCreate>({
    resolver: zodResolver(ProductCreateSchema),
  });
  const {
    formState: {errors},
    control,
  } = form;

  const {fields, append, remove} = useFieldArray({
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
    toast({
      title: "Product created",
      description: "Product has been created successfully",
    });
  };

  return (
    <form
      onSubmit={form.handleSubmit(handleSubmit)}
      className="space-y-4 max-w-5xl bg-white shadow-md p-4 "
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 ">
        <div className="flex flex-col ">
          <input
            {...form.register("name")}
            type="text"
            placeholder="Name"
            className="p-2 border rounded text-black"
          />
          {errors.name && (
            <span className="text-red-500">{errors.name.message}</span>
          )}
        </div>

        <div className="flex flex-col">
          <input
            {...form.register("description")}
            type="text"
            placeholder="Description"
            className="p-2 border rounded text-black"
          />
          {errors.description && (
            <span className="text-red-500">{errors.description?.message}</span>
          )}
        </div>

        <div className="flex flex-col">
          <input
            {...form.register("price", {valueAsNumber: true})}
            type="number"
            placeholder="Price"
            className="p-2 border rounded text-black"
          />
          {errors.price && (
            <span className="text-red-500">{errors.price?.message}</span>
          )}
        </div>

        <div className="flex flex-col">
          <input
            {...form.register("image")}
            type="text"
            placeholder="Image URL"
            className="p-2 border rounded text-black"
          />
          {errors.image && (
            <span className="text-red-500">{errors.image?.message}</span>
          )}
        </div>

        <div className="flex flex-col">
          <input
            {...form.register("stock", {valueAsNumber: true})}
            type="number"
            placeholder="Stock"
            className="p-2 border rounded text-black"
          />
          {errors.stock && (
            <span className="text-red-500">{errors.stock?.message}</span>
          )}
        </div>
      </div>

      <div>
        <button
          type="button"
          onClick={() => append({name: "", slug: ""})}
          className="bg-black text-white px-4 py-2 rounded w-48"
        >
          Add Category
        </button>
        {fields.map((field, index) => (
          <div key={field.id} className="flex items-center space-x-4 my-2">
            <select
              {...form.register(`categories.${index}.name` as const)}
              defaultValue=""
              className="p-2 border rounded text-black w-48 mt-2"
            >
              <option value="">Select a category</option>
              {categories?.map(category => (
                <option key={category.id} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
            <XIcon
              className="text-red-500 size-6 cursor-pointer hover:scale-110"
              onClick={() => remove(index)}
            />
          </div>
        ))}
      </div>
      {errors.categories && (
        <span className="text-red-500">{errors.categories.message}</span>
      )}

      <button
        type="submit"
        className="bg-orange-400 text-white py-2 px-10 rounded hover:bg-orange-300 w-48"
      >
        Submit
      </button>
    </form>
  );
};

export default ProductForm;
