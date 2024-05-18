"use client";

import { authenticateUser } from "@/app/actions/authenticate";
import { getProduct } from "@/app/actions/product";
import { AuthUser } from "@/components/header/Header";
import { Product } from "@prisma/client";
import { useEffect, useState } from "react";

interface PageProps {
  params: {
    id: string;
  };
}

export default function EditPage({ params }: PageProps) {
  const { id } = params;
  const [product, setProduct] = useState<Product | null>(null);
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    async function fetchAuth() {
      const fetchedUser = await authenticateUser();
      setUser(fetchedUser);
    }
    fetchAuth();
  }, []);

  useEffect(() => {
    async function fetchProduct() {
      const productId = Number(id);
      try {
        const fetchedProduct = await getProduct(productId);
        setProduct(fetchedProduct);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    }

    fetchProduct();
  }, [id]);

  return user?.admin ? (
    <div className="text-white">
      <div>
        <h1>Edit Product: {product!.name}</h1>
      </div>
    </div>
  ) : (
    <p>L0ading...</p>
  );
}
