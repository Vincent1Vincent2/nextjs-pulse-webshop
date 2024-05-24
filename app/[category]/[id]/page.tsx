"use client";
import {getProductsByCategory} from "@/app/actions/product";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {Product} from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import {useEffect, useState} from "react";

interface PageProps {
  params: {category: string};
}

export default function CategoryPage({params}: PageProps) {
  const {category} = params;
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const fetchedProducts = await getProductsByCategory(params.category);
        console.log("Fetched products:", fetchedProducts);
        const products = fetchedProducts.map(product => ({
          ...product,
          price: product.price,
          description: product.description,
        }));
        setProducts(products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [params.category]);

  return (
    <main className="bg-[#F4F4F5] p-2 shadow rounded-lg container flex flex-col">
      {products.map(product => (
        <Card key={product.id}>
          <CardHeader>
            <Link href={`/product/${product.id}`}>
              <p>View Product</p>
            </Link>
          </CardHeader>
          <CardContent className="flex items-center flex-col">
            <Image
              src={product.image!}
              alt="product image"
              width={300}
              height={300}
            />
            <div className="flex w-full justify-between items-center">
              <div className="pe-10">
                <CardTitle
                  className="text-3xl self-start"
                  data-cy="product-title"
                >
                  {product.name}
                </CardTitle>
                <CardDescription
                  className="self-start"
                  data-cy="product-description"
                >
                  {product.description}
                </CardDescription>
                <CardDescription className="self-start" data-cy="product-price">
                  ${product.price.toString()}
                </CardDescription>
                {/*    <AddToCartButton product={product} /> */}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </main>
  );
}
