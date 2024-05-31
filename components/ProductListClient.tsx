import {Product} from "@prisma/client";
import React from "react";
import ProductCard from "./ProductCard";

interface ProductListProps {
  products: Product[];
}

export default function ProductListClient({products}: ProductListProps) {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2 max-w-7xl m-5 sm:mx-auto mt-10">
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
