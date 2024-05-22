// "use client";
import {getCategories} from "@/app/actions/category";
import {getProductsByCategory} from "@/app/actions/product";
import {useEffect, useState} from "react";

interface Category {
  id: number;
  name: string;
}

interface Product {
  id: number;
  name: string;
}

export function List({
  onCategoryClick,
}: {
  onCategoryClick: (categoryName: string) => void;
}) {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categories = await getCategories();
        setCategories(categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <>
      {categories.map(category => (
        <li
          className="hover:cursor-pointer text-black py-2 px-5 border-b border-gray-200 hover:bg-gray-200 transition-all"
          key={category.id}
          onClick={() => onCategoryClick(category.name)}
        >
          {category.name}
        </li>
      ))}
    </>
  );
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
