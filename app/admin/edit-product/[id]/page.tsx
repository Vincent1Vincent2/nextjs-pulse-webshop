"use client";

import {authenticateUser} from "@/app/actions/authenticate";
import {getCategories} from "@/app/actions/category";
import {getProduct, productUpdate} from "@/app/actions/product";
import {ProductCreate, ProductCreateSchema} from "@/app/zodSchemas/product";
import {toast} from "@/components/ui/use-toast";
import {zodResolver} from "@hookform/resolvers/zod";
import {Category, Product, User} from "@prisma/client";
import {ArrowRightIcon, XIcon} from "lucide-react";
import Link from "next/link";
import {useEffect, useState} from "react";
import {useFieldArray, useForm} from "react-hook-form";

interface PageProps {
  params: {
    id: string;
  };
}

export default function EditPage({params}: PageProps) {
  const {id} = params;
  const form = useForm<ProductCreate>({
    resolver: zodResolver(ProductCreateSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      image: "",
      categories: [],
    },
  });
  const {
    formState: {errors},
    control,
    reset,
  } = form;

  const {fields, append, remove} = useFieldArray({
    control,
    name: "categories",
  });

  const [categories, setCategories] = useState<Category[] | null>(null);
  const [product, setProduct] = useState<
    (Product & {categories: Category[]}) | null
  >(null);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    async function fetchCategories() {
      const fetchedUser = await authenticateUser();
      setUser(fetchedUser);
      const fetchedCategories = await getCategories();
      setCategories(fetchedCategories);
    }
    fetchCategories();
  }, []);

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

  useEffect(() => {
    async function fetchCategories() {
      const fetchedCategories = await getCategories();
      setCategories(fetchedCategories);
    }
    fetchCategories();
  }, []);

  useEffect(() => {
    async function fetchProduct() {
      const productId = Number(id);
      try {
        const fetchedProduct = await getProduct(productId);
        setProduct(fetchedProduct);
        if (fetchedProduct) {
          reset({
            name: fetchedProduct.name,
            description: fetchedProduct.description,
            price: fetchedProduct.price,
            image: fetchedProduct.image || "",
            stock: fetchedProduct.stock,
            categories: fetchedProduct.categories.map(c => ({
              name: c.name,
            })),
          });
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    }

    fetchProduct();
  }, [id, reset]);

  return user?.isAdmin ? (
    <div className="min-h-screen flex flex-col items-center justify-center m-2 ">
      <h1 className=" text-xl sm:text-3xl font-bold text-white mb-6">
        Edit Product
      </h1>
      <div className="max-w-5xl w-full p-6 bg-white shadow-lg rounded-lg">
        <h1 className=" text-xl sm:text-3xl font-bold text-gray-800 mb-6">
          {product?.name}
        </h1>
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
                <span className="text-red-500">
                  {errors.description?.message}
                </span>
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

          <Link
            href="/admin"
            className=" flex text-black justify-center items-center gap-4"
          >
            <p className="text-xl font-bold hover:text-black/70 transition-all">
              {" "}
              To Admin Dashboard
            </p>
            <ArrowRightIcon className=" size-5 hover:translate-x-1 transition-all" />
          </Link>
        </form>
      </div>
    </div>
  ) : (
    <p>Loading...</p>
  );
}
