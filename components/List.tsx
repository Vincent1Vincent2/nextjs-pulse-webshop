"use client";
import {getCategories} from "@/app/actions/category";
import Link from "next/link";
import {useEffect, useState} from "react";

interface Category {
  id: number;
  name: string;
}

export function List() {
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
        <Link
          href={`/category/${category.name}/${category.id}`}
          key={category.id}
        >
          <li className="text-sm hover:cursor-pointer text-white p-2 bg-stone-700 hover:bg-stone-600 w-32 justify-center text-center bg-opacity-50 hover:bg-opacity-50 hover:text-gray-300">
            {category.name}
          </li>
        </Link>
      ))}
    </>
  );
}
