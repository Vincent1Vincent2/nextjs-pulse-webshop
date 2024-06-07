import {Product} from "@prisma/client";
import ProductCard from "./ProductCard";

interface ProductListProps {
  products: Product[];
}

export default function ProductListClient({products}: ProductListProps) {
  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mt-20 pb-20 px-10 ">
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
