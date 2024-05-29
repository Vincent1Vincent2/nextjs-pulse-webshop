"use client";
import {getCategories} from "@/app/actions/category";
import Link from "next/link";
import {useEffect, useState} from "react";

interface Category {
  id: number;
  name: string;
}

export default function CategoryCards() {
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
    <div className="bg-black py-10 flex flex-col items-center">
      <div className="text-white text-2xl font-bold mb-10">
        Shop By Category
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-20">
        {categories.map(category => (
          <Link
            href={`/category/${category.name}/${category.id}`}
            key={category.id}
            className="flex items-center text-center justify-center border border-orange-400 text-orange-400 rounded-md h-40 w-40 transform transition duration-500 hover:scale-125"
          >
            <span className="text-lg font-medium">{category.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
