"use client";
import {productUpdate} from "@/app/actions/product";
import {ProductCreate, ProductCreateSchema} from "@/app/zodSchemas/product";
import {zodResolver} from "@hookform/resolvers/zod";
import {Category, Product} from "@prisma/client";
import {useEffect} from "react";
import {useFieldArray, useForm} from "react-hook-form";
import {toast} from "./ui/use-toast";

interface EditFormProps {
  categories: Category[];
  product?: Product;
}

const EditForm = ({categories, product}: EditFormProps) => {
  const form = useForm<ProductCreate>({
    resolver: zodResolver(ProductCreateSchema),
    defaultValues: product || {
      name: "",
      description: "",
      price: 0,
      image: "",
      categories: [],
      stock: 0,
    },
  });
  const {
    formState: {errors},
    control,
    setError,
    reset,
  } = form;

  const {fields, append, remove} = useFieldArray({
    control,
    name: "categories",
  });

  useEffect(() => {
    if (product) {
      reset(product);
    }
  }, [product, reset]);

  const handleSubmit = async (data: ProductCreate) => {
    await productUpdate(data, product?.id);
    form.reset({
      name: data.name,
      description: data.description,
      price: data.price,
      image: data.image,
      stock: data.stock,
      categories: data.categories,
    });
    toast({
      title: "Product updated",
      description: "Product has been updated successfully.",
    });
  };

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col">
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
              defaultValue={field.name || ""}
              className="p-2 border rounded text-black w-48 mt-2"
            >
              <option value="">Select a category</option>
              {categories?.map(category => (
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
      </div>
      {errors.categories && (
        <span className="text-red-500">{errors.categories.message}</span>
      )}
      {errors.root && (
        <span className="text-red-500">{errors.root.message}</span>
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

export default EditForm;
