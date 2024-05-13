"use client";

import { useProducts } from "@/app/contexts/ProductContext";
import AddToCartButton from "@/components/AddToCartButton";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChevronLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type PageProps = { params: { id: string } };

type Props = {
  params: { id: string };
};

export default function ProductPage({ params }: PageProps) {
  const { products: isProducts } = useProducts();
  const product = getProductById(params.id);

  function getProductById(id: string) {
    return isProducts.find((product) => product.id === id);
  }

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
            src={product.image}
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
                {product.title}
              </CardTitle>
              <CardDescription
                className="self-start"
                data-cy="product-description"
              >
                {product.description}
              </CardDescription>
              <CardDescription className="self-start" data-cy="product-price">
                ${product.price}
              </CardDescription>
            </div>

            <AddToCartButton product={product} />
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
