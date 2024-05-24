"use client";
import {getCurrentProducts, getProductsByCategory} from "@/app/actions/product";
import {useCategory} from "@/app/contexts/CategoryContext";
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
  const {selectedCategory} = useCategory();

  useEffect(() => {
    async function fetchProducts() {
      try {
        const fetchedProducts =
          selectedCategory && selectedCategory !== "All Products"
            ? await getProductsByCategory(selectedCategory)
            : await getCurrentProducts();
        setProducts(fetchedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }
    fetchProducts();
  }, [selectedCategory]);

  return (
    <div className="md:grid md:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-20 mx-auto">
      {products.map((product: Product) => (
        <Card
          key={product.id}
          className=" flex flex-col w-96 mb-4 md:w-80 lg:w-72 lg:h-96 hover:opacity-90 transition-all rounded-sm"
          data-cy="product"
        >
          <CardHeader>
            <CardTitle className="flex justify-center" data-cy="product-title">
              {product.name}
            </CardTitle>
          </CardHeader>
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
