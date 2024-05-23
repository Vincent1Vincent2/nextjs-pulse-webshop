"use client";
import {getCategories} from "@/app/actions/category";
import {useEffect, useState} from "react";

interface Category {
  id: number;
  name: string;
}

interface Props {
  onCategoryClick: (categoryName: string) => void;
}

export function List({onCategoryClick}: Props) {
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
