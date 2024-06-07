import React from "react";
import ProductListClient from "../../components/ProductListClient";
import {searchProducts} from "../actions/product";

const SearchProduct: React.FC = async ({searchParams}: any) => {
  const query = searchParams.query || "";
  const results = await searchProducts(query);

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
