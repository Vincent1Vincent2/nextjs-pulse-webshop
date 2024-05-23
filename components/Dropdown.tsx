"use client";
import {getProductsByCategory} from "@/app/actions/product";

import {useRouter} from "next/navigation";
import {useState} from "react";
import {List} from "./List";

interface Product {
  id: number;
  name: string;
}

export default function Dropdown() {
  const [seen, setSeen] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);

  const router = useRouter();

  const handleCategoryClick = async (categoryName: string) => {
    setSeen(false);
    try {
      const products = await getProductsByCategory(categoryName);
      setProducts(products);
      router.push(`/category/${categoryName}`);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  return (
    <div className="hover:cursor-pointer relative">
      <span
        onMouseOver={() => setSeen(!seen)}
        onMouseLeave={() => setSeen(seen)}
        onClick={() => setSeen(!seen)}
      >
        Categories
      </span>
      {seen && (
        <ul
          onMouseLeave={() => setSeen(false)}
          className="absolute bg-white flex flex-col z-10 border border-gray-200"
        >
          <List onCategoryClick={handleCategoryClick} />
        </ul>
      )}
    </div>
  );
}
