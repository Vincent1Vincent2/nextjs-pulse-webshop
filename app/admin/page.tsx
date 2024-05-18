"use client";
import { Product } from "@prisma/client";
import { useEffect, useState } from "react";
import { deleteProduct, getProducts } from "../actions/product";

// kan inte "rensa" detta page, shadcn fockar med att sätta rutan inuti parent när man sätter allt nedan i en komponent.

export default function AdminPage() {
  const [products, setProducts] = useState<Product[]>();

  useEffect(() => {
    async function fetchProducts() {
      const fetchedProducts = await getProducts();
      setProducts(fetchedProducts);
    }
    fetchProducts();
  }, []);

  return (
    <main className="bg-[#F4F4F5] p-2 shadow rounded-lg container flex flex-col gap-5">
      {products?.map((p) => (
        <div key={p.id}>
          <ul>
            <li>ID - {p.id}</li>
            <li>{p.name}</li>
            <li>{p.description}</li>
          </ul>
          <button onClick={() => deleteProduct(p.id)}>Do a lil delete</button>
        </div>
      ))}
    </main>
  );
}
