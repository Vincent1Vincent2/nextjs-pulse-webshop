import React from "react";
import ProductList from "../../components/ProductList";
import {searchProducts} from "../actions/product";

interface SearchPageProps {
  searchParams: {query?: string};
}

export default async function SearchProduct({searchParams}: SearchPageProps) {
  const query = searchParams.query || "";

  if (!query) {
    return <div>Please enter your search query!</div>;
  }

  const data = await searchProducts(query);
  return <ProductList products={data} />;
}
