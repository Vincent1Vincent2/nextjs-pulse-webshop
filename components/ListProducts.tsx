"use client";
import {getCurrentProducts} from "@/app/actions/product";

import {Product} from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import {useEffect, useState} from "react";
import AddToCartButton from "./AddToCartButton";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

function ListProducts() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function fetchProducts() {
      const fetchedProducts = await getCurrentProducts();
      setProducts(fetchedProducts);
    }
    fetchProducts();
  }, []);

  return (
    <div className=" md:grid md:grid-cols-2 lg:grid-cols-3 gap-2">
      {products.map((product: Product) => (
        <Card key={product.id} className="flex flex-col" data-cy="product">
          <CardHeader>
            <CardTitle className="flex justify-center" data-cy="product-title">
              {product.name}
            </CardTitle>
          </CardHeader>
          <div className="flex-1"></div>
          <Link href={`/product/${product.id}`}>
            <CardContent className="flex justify-center">
              <Image
                src={product.image!}
                alt="product image"
                width={150}
                height={150}
              />
            </CardContent>
          </Link>
          <div className="flex-1"></div>
          <CardFooter className="flex justify-between items-center">
            <CardDescription data-cy="product-price">
              {product.price.toString()} SEK
            </CardDescription>

            <AddToCartButton product={product} />
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}

export default ListProducts;
