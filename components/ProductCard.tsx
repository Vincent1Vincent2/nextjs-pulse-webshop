import {Product} from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import AddToCartButton from "./AddToCartButton";
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "./ui/card";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Card key={product.id} className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-300" style={{ width: '300px', height: 'auto' }}>
      <div className="flex flex-col h-full">
        {/* Titel */}
        <div className="p-4 bg-gray-100">
          <h2 className="text-lg font-semibold overflow-hidden" data-cy="product-title">
            {product.name}
          </h2>
        </div>
        
        {/* Bild */}
        <Link href={`/product/${product.name}/${product.id}`} className="flex-grow">
          <div className="flex justify-center items-center h-full">
            <div className="relative">
              <Image
                src={product.image || "/placeholder-image.jpg"}
                alt="product image"
                width={250}
                height={250}
                objectFit="cover"
              />
            </div>
          </div>
        </Link>
        
        {/* Pris och knapp */}
        <div className="bg-gray-100 p-4 flex justify-between items-center">
          <span className="font-semibold pl-4" data-cy="product-price">
            ${product.price}
          </span>
          <AddToCartButton product={product} />
        </div>
      </div>
    </Card>
  );
};

