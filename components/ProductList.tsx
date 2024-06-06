"use client";

import AddToCartButton from "@/components/AddToCartButton";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {Category, Product} from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import {useState} from "react";
import ProductCard from "./ProductCard";

interface ProductListProps {
  products: Product[];
  currentCategory: Category;
  categories: Category[];
}

export default function ProductList(props: ProductListProps) {
  const [products, setProducts] = useState<Product[]>(props.products);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  return (
    <>
      <div className="flex justify-end items-center mt-4 lg:mx-auto pr-8">
        <label
          htmlFor="sortOrder"
          style={{marginRight: "10px", color: "white"}}
        >
          Price:{" "}
        </label>
        <select
          id="sortOrder"
          onChange={e => {
            setSortOrder(e.target.value as "asc" | "desc");
            setProducts(
              [...products].sort((p1, p2) =>
                e.target.value === "asc"
                  ? p1.price < p2.price
                    ? -1
                    : 1
                  : p1.price > p2.price
                    ? -1
                    : 1,
              ),
            );
          }}
          style={{
            fontFamily: "Times New Roman",
            padding: "5px",
          }}
        >
          <option value="asc">Lowest to Highest</option>
          <option value="desc">Highest to Lowest</option>
        </select>
      </div>
      <div className="flex flex-col items-center">
        <div className="py-8 text-center text-white text-4xl font-semibold rounded-md">
          {props.currentCategory.name}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 lg:gap-10 px-4 md:px-10">
          {products.map(({ id, name, image, price, ...rest }) => (
            <Card key={id} className="w-full h-full flex flex-col">
              <Link href={`/product/${name}/${id}`} className="flex flex-col h-full">
                <CardHeader className="h-80 flex-shrink-0 overflow-hidden relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Image
                      src={image}
                      alt={name}
                      layout="fill"
                      objectFit="contain"
                    />
                  </div>
                </CardHeader>
                <CardContent className="flex flex-col justify-between flex-grow p-4">
                  <CardTitle className="text-lg text-center" data-cy="product-title">
                    {name}
                  </CardTitle>
                  <div className="mt-auto flex justify-between items-center pt-5">
                    <span className="text-xl font-semibold" data-cy="product-price">
                      ${price}
                    </span>
                    <AddToCartButton product={{ id, name, price, image, ...rest }} />
                  </div>
                </CardContent>
              </Link>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
}

