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
      <div className="flex justify-end items-center mt-4 max-w-7xl lg:mx-auto mx-5">
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
        <div className="flex justify-center w-full mt-4">
          <div className="md:grid md:grid-cols-2 lg:grid-cols-4 xl:grid.cols-4 gap-4 justify-items-center gap-6 px-10">
            {products.map(({id, name, image, price, ...rest}) => (
            <Card key={id} className="w-96" data-cy="product">
            <Link href={`/product/${name}/${id}`}>
            <CardHeader className="h-96">
            <CardTitle
             className="flex justify-center text-lg"
             data-cy="product-title"
             >
             {name}
           </CardTitle>
           <Image
           src={image || "/placeholder-image.jpg"}
           alt="product image"
           width={350}
           height={350}
           />
           </CardHeader>
           </Link>
           <CardContent>
      
           <CardFooter className="pt-5 flex justify-between">
            <span data-cy="product-price">${price}</span>
            <AddToCartButton
             product={{id, name, price, image, ...rest}}
           />
           </CardFooter>
           </CardContent>
           </Card>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

