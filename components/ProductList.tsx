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
      <div className="flex justify-end items-center mt-4 lg:mx-auto">
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
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 max-w-7xl lg:mx-auto mx-5 mt-5">
        {products.map(({id, name, image, price, ...rest}) => (
          <ProductCard
            key={id}
            product={{
              id,
              name,
              image,
              price,
              ...rest,
            }}
          />
        ))}
      </div>
      </div>
    </>
  );
}

