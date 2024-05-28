"use client";
import {getProductsByCategoryAndSort} from "@/app/actions/product";
import AddToCartButton from "@/components/AddToCartButton";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import {useEffect, useState} from "react";

interface ProductListProps {
  slug: string;
}

export default function ProductList({slug}: ProductListProps) {
  const [products, setProducts] = useState([]);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  useEffect(() => {
    getProductsByCategoryAndSort(slug, sortOrder).then(setProducts);
  }, [sortOrder]);

  return (
    <>
      <div>
        <button onClick={() => setSortOrder("asc")}>Lowest to Highest</button>
        <button onClick={() => setSortOrder("desc")}>Highest to Lowest</button>
      </div>
      <div className="md:grid md:grid-cols-2 lg:grid-cols-3 gap-2">
        {products.map(({id, name, image, price}) => (
          <Card key={id} className="flex flex-col" data-cy="product">
            <CardHeader>
              <CardTitle
                className="flex justify-center"
                data-cy="product-title"
              >
                {name}
              </CardTitle>
            </CardHeader>
            <Link href={`/product/${name}/${id}`}>
              <CardContent className="flex justify-center">
                <Image
                  src={image || "/placeholder-image.jpg"}
                  alt="product image"
                  width={150}
                  height={150}
                />
              </CardContent>
            </Link>
            <CardFooter className="flex justify-between items-center">
              <span data-cy="product-price">${price}</span>
              <AddToCartButton product={{id, name, price, image}} />
            </CardFooter>
          </Card>
        ))}
      </div>
    </>
  );
}
