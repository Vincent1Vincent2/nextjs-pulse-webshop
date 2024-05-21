"use client";
import ProductForm from "@/components/ProductForm";
import { AuthUser } from "@/components/header/Header";
import { Product } from "@prisma/client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { authenticateUser } from "../actions/authenticate";
import { deleteProduct, getCurrentProducts } from "../actions/product";

export default function AdminPage() {
  const [products, setProducts] = useState<Product[]>();
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    async function fetchAuth() {
      const fetchedUser = await authenticateUser();
      setUser(fetchedUser);
    }
    fetchAuth();
  }, []);

  useEffect(() => {
    async function fetchProducts() {
      const fetchedProducts = await getCurrentProducts();
      setProducts(fetchedProducts);
    }
    fetchProducts();
  }, []);

  return user?.admin ? (
    <main className="bg-[#F4F4F5] p-2 shadow rounded-lg container flex flex-col gap-5">
      <div>
        <h2>Add a product</h2>
        <ProductForm />
      </div>
      <Link className="text-black" href={"/admin/orders"}>
        User Orders
      </Link>
      {products?.map((p) => (
        <div key={p.id}>
          <ul>
            <li>ID - {p.id}</li>
            <li>{p.name}</li>
            <li>{p.description}</li>
          </ul>
          <button onClick={() => deleteProduct(p.id)}>Do a lil delete</button>
          <Link href={`/admin/edit-product/${p.id}`}>
            <button>We do a lil editing?</button>
          </Link>
        </div>
      ))}
    </main>
  ) : (
    <main className="bg-[#F4F4F5] p-2 shadow rounded-lg container flex flex-col gap-5">
      <p>Loading!</p>
    </main>
  );
}
