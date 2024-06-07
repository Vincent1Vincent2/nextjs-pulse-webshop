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

  const handleChangeSortOrder = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOrder = e.target.value as "asc" | "desc";
    setSortOrder(selectedOrder);
    const sortedProducts = [...products].sort((p1, p2) =>
      selectedOrder === "asc" ? p1.price - p2.price : p2.price - p1.price,
    );
    setProducts(sortedProducts);
  };

  return (
    <>
      <div className="flex justify-end items-center mt-4">
        <label htmlFor="sortOrder" className="mr-2 text-white">
          Price:
        </label>
        <select
          id="sortOrder"
          value={sortOrder}
          onChange={handleChangeSortOrder}
          className="bg-white text-black p-1 rounded"
        >
          <option value="asc">Lowest to Highest</option>
          <option value="desc">Highest to Lowest</option>
        </select>
      </div>
      <div className="flex flex-col items-center">
        <div className="py-8 text-center text-white text-4xl font-semibold rounded-md">
          {props.currentCategory.name}
        </div>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 mt-5 pb-20 px-10">
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
