"use client";
import {useEffect, useState} from "react";
import {getBestSellingProducts} from "../actions/order";

export default function Sales() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getBestSellingProducts().then(setProducts);
  }, []);

  return (
    <main className="m-5 rounded-xl p-5">
      <h2 className="text-white">Best Sellers</h2>
      {products.map(product => (
        <div key={product.id}>
          <h2>{product.name}</h2>
          <p>{product.description}</p>
          <p>Price: {product.price}</p>
          <img src={product.image} alt={product.name} />
        </div>
      ))}
    </main>
  );
}
