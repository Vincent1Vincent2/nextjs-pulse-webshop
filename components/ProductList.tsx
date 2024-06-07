"use client";

import {Category, Product} from "@prisma/client";
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
      <div className="flex flex-col items-center max-w-7xl mx-auto">
        <div className="py-20 text-center text-white text-4xl font-semibold rounded-md">
          {props.currentCategory.name}
        </div>
        <div className="fixed z-50 w-full flex justify-end items-center p-5 mr-50 text-white md:px-10">
          <label htmlFor="sortOrder" className="mr-2 text-bold text-white">
            Price:
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
            className="px-2 py-1 rounded border text-black"
          >
            <option value="asc">Lowest to Highest</option>
            <option value="desc">Highest to Lowest</option>
          </select>
        </div>

        <div className="flex justify-center max-w-7xl">
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mt-5 pb-20 px-10">
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
      </div>
    </>
  );
}
