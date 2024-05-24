import {getProductsByCategory} from "@/app/actions/product";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

interface PageProps {
  params: {category: string};
}

export default async function CategoryPage({params}: PageProps) {
  const products = await getProductsByCategory(params.category);

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
