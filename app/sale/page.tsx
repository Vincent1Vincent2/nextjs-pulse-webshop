"use client";
import AddToCartButton from "@/components/AddToCartButton";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import {useEffect, useState} from "react";
import {getBestSellingProducts} from "../actions/order";
import {Product} from "../types";

export default function Sales() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getBestSellingProducts().then(setProducts);
  }, []);

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          textDecoration: "underline",
          color: "white",
          fontFamily: "Times New Roman",
          padding: "10px",
        }}
      >
        <h2 className="text-white">Best Sellers</h2>
      </div>
      <div className="md:grid md:grid-cols-2 lg:grid-cols-3 gap-2">
        {products.map(product => (
          <Card key={product.id} className="flex flex-col" data-cy="product">
            <CardHeader>
              <CardTitle
                className="flex justify-center"
                data-cy="product-title"
              >
                {product.name}
              </CardTitle>
            </CardHeader>
            <CardContent className="flex justify-center">
              <Image
                src={product.image}
                alt="product image"
                width={150}
                height={150}
              />
            </CardContent>
            <CardFooter className="flex justify-between items-center">
              <span data-cy="product-price">${product.price.toString()}</span>
              <AddToCartButton product={product} />
            </CardFooter>
          </Card>
        ))}
      </div>
    </>
  );
}
