"use client";

import {authenticateUser} from "@/app/actions/authenticate";
import {getCategories} from "@/app/actions/category";
import {getProduct, productUpdate} from "@/app/actions/product";
import {ProductCreate, ProductCreateSchema} from "@/app/zodSchemas/product";
import {zodResolver} from "@hookform/resolvers/zod";
import {Category, Product} from "@prisma/client";

import {useEffect, useState} from "react";
import {useFieldArray, useForm} from "react-hook-form";

interface PageProps {
  params: {
    id: string;
  };
}

type User = {
  id: string;
  name: string | null;
  email: string;
  emailVerified: Date | null;
  image: string | null;
  createdAt: Date;
  updatedAt: Date;
  isAdmin: boolean;
  phoneNumber: string | null;
};

export default function EditPage({params}: PageProps) {
  const {id} = params;
  const form = useForm<ProductCreate>({
    resolver: zodResolver(ProductCreateSchema),
    defaultValues: {
      name: "",
      description: "",
      price: "",
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
            price: fetchedProduct.price.toString(),
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

  console.log(user?.isAdmin);

  const handleSubmit = async (data: ProductCreate) => {
    console.log("in");
    await productUpdate(data, product?.id);
    form.reset();
  };

  return user?.isAdmin ? (
    <div className="text-white">
      <div>
        <h1>Edit Product: {product?.name}</h1>
        <form className="text-black" onSubmit={form.handleSubmit(handleSubmit)}>
          <input {...form.register("name")} type="text" placeholder="Name" />
          {errors.name && <span>{errors.name.message}</span>}

          <input
            {...form.register("description")}
            type="text"
            placeholder="Description"
          />
          {errors.description && <span>{errors.description?.message}</span>}

          <input
            {...form.register("price")}
            type="number"
            placeholder="Price"
          />
          {errors.price && <span>{errors.price?.message}</span>}

          <input
            {...form.register("image")}
            type="text"
            placeholder="Image URL"
          />
          {errors.image && <span>{errors.image?.message}</span>}

          <input
            {...form.register("stock", {valueAsNumber: true})}
            type="number"
            placeholder="Stock"
          />
          {errors.stock && <span>{errors.stock?.message}</span>}

          <div className="text-white">
            {fields.map((field, index) => (
              <div key={field.id}>
                <select
                  className="text-black"
                  {...form.register(`categories.${index}.name` as const)}
                  defaultValue={field.name || ""}
                >
                  <option value="">Select a category</option>
                  {categories?.map(category => (
                    <option key={category.id} value={category.name}>
                      {category.name}
                    </option>
                  ))}
                </select>
                <button
                  className="text-white"
                  type="button"
                  onClick={() => remove(index)}
                >
                  Remove
                </button>
              </div>
            ))}
            <button type="button" onClick={() => append({name: ""})}>
              Add Category
            </button>
          </div>
          {errors.categories && <span>{errors.categories.message}</span>}

          <button className="text-white" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  ) : null;
}
