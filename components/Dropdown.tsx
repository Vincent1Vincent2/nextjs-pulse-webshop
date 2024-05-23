"use client";
import {getProductsByCategory} from "@/app/actions/product";
import {useState} from "react";
import {List} from "./List";

interface Product {
  id: number;
  name: string;
}

export default function Dropdown() {
  const [seen, setSeen] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);

  const handleCategoryClick = async (categoryName: string) => {
    setSeen(false);
    try {
      const products = await getProductsByCategory(categoryName);
      setProducts(products);
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
      <div>
        {products.length > 0 && (
          <ul>
            {products.map(product => (
              <li key={product.id}>{product.name}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
