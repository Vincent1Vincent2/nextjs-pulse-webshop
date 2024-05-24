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
        <Link href={`/category/${category.name}`} key={category.id}>
          <li className="hover:cursor-pointer text-black py-2 px-5 border-b border-gray-200 hover:bg-gray-200 transition-all">
            {category.name}
          </li>
        </Link>
      ))}
    </>
  );
}
