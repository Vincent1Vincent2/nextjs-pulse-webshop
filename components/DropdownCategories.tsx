"use client";

import {useState} from "react";
import {List} from "./List";

interface Product {
  id: number;
  name: string;
}

export default function Dropdown() {
  const [seen, setSeen] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);

  return (
    <div className="hover:cursor-pointer relative">
      <span
        className=" text-white text-lg sm:text-base hover:cursor-pointer"
        onMouseOver={() => setSeen(!seen)}
        onMouseLeave={() => setSeen(seen)}
        onClick={() => setSeen(!seen)}
      >
        Categories
      </span>
      {seen && (
        <ul
          onMouseLeave={() => setSeen(false)}
          className="absolute top-0 lg:top-full left-32 w-full flex flex-col lg:flex-row justify-center z-10"
        >
          <List />
        </ul>
      )}
    </div>
  );
}
