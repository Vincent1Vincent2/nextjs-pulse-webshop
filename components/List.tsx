"use client";
import {categoriesAtom} from "@/app/utils/atoms";
import {useAtomValue} from "jotai";
import Link from "next/link";

export function List() {
  const categories = useAtomValue(categoriesAtom);

  return (
    <>
      {categories.map(category => (
        <Link
          href={`/category/${category.slug}/${category.id}`}
          key={category.id}
        >
          <li className="text-sm hover:cursor-pointer text-white p-2 bg-stone-900/90 hover:bg-stone-800 lg:bg-stone-700 lg:hover:bg-stone-600 w-40 lg:w-32 justify-center text-left lg:text-center lg:bg-opacity-50 lg:hover:bg-opacity-50 hover:text-gray-300">
            {category.name}
          </li>
        </Link>
      ))}
    </>
  );
}
