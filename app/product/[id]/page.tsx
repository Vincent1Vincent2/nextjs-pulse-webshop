"use client";

import {getCategories} from "@/app/actions/category";
import {getProduct} from "@/app/actions/product";
import AddToCartButton from "@/components/AddToCartButton";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {Category, Product} from "@prisma/client";
import {ChevronLeft} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {useEffect, useState} from "react";

interface PageProps {
  params: {
    id: string;
  };
}

export default function ProductPage({params}: PageProps) {
  const {id} = params;

  const [categories, setCategories] = useState<Category[] | null>(null);
  const [product, setProduct] = useState<
    (Product & {categories: Category[]}) | null
  >(null);

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
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    }

    fetchProduct();
  }, [id]);

  if (!product) {
    return (
      <main className="p-5">
        <h2>Not Found</h2>
        <Link href={"/"}>Go to homepage</Link>
      </main>
    );
  }

  return (
    <main className="bg-[#F4F4F5] p-2 shadow rounded-lg container flex flex-col">
      <Card>
        <CardHeader>
          <Link href={"/"}>
            <ChevronLeft width={30} height={30} />
          </Link>
        </CardHeader>
        <CardContent className="flex items-center flex-col">
          <Image
            src={product.image!}
            alt="product image"
            width={300}
            height={300}
          />
          <div className="flex w-full justify-between items-center">
            <div className="pe-10">
              <CardTitle
                className="text-3xl self-start"
                data-cy="product-title"
              >
                {product.name}
              </CardTitle>
              <CardDescription
                className="self-start"
                data-cy="product-description"
              >
                {product.description}
              </CardDescription>
              <CardDescription className="self-start" data-cy="product-price">
                ${product.price.toString()}
              </CardDescription>
            </div>

            <AddToCartButton product={product} />
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
