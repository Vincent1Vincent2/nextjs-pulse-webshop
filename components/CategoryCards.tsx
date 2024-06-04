"use client";
import {getCategories} from "@/app/actions/category";
import {Category} from "@prisma/client";
import Link from "next/link";
import {useEffect, useState} from "react";

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
      <div className="text-white text-xl sm:text-2xl font-bold mb-10">
        Shop By Category
      </div>
      <div className="flex flex-wrap justify-center gap-4 px-2">
        {categories.map(category => (
          <Link
            href={`/category/${category.slug}/${category.id}`}
            key={category.id}
            className="flex items-center text-center justify-center border border-orange-400 text-orange-400 rounded-md h-20 w-40 transform transition duration-500 hover:scale-105"
          >
            <span className="text-lg font-medium">{category.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
