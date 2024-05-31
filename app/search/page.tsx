"use client";

import {Product} from "@prisma/client";
import {useSearchParams} from "next/navigation";
import React, {useEffect, useState} from "react";
import ProductListClient from "../../components/ProductListClient";
import {searchProducts} from "../actions/product";

const SearchProduct: React.FC = () => {
  const [results, setResults] = useState<Product[]>([]);
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";

  useEffect(() => {
    const fetchData = async () => {
      if (query) {
        try {
          const data = await searchProducts(query);
          setResults(data);
          console.log("Fetched search results:", data);
        } catch (error) {
          console.error("Error fetching search results:", error);
        }
      }
    };

    fetchData();
  }, [query]);

  if (!query) {
    return (
      <div className=" text-white/50 flex justify-center items-center min-h-96">
        <h1 className="text-xl">
          Please provide a search query to find products.
        </h1>
      </div>
    );
  }

  return <ProductListClient products={results} />;
};

export default SearchProduct;
