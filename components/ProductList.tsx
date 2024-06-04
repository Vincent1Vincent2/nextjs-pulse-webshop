"use client";

import {Product} from "@prisma/client";
import {useState} from "react";
import ProductCard from "./ProductCard";

interface ProductListProps {
  products: Product[];
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
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2 max-w-7xl lg:mx-auto mx-5 mt-5">
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
    </>
  );
}
