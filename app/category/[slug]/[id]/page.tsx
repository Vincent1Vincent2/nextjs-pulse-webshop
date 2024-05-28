import {getProductsByCategory} from "@/app/actions/product";
import { getCategoryBySlug } from "@/app/actions/category";
import AddToCartButton from "@/components/AddToCartButton";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

interface PageProps {
  params: {slug: string};
}

export default async function CategoryPage({params}: PageProps) {
  const products = await getProductsByCategory(params.slug);
  const category = await getCategoryBySlug(params.slug);

    if (!category) {
    return <div className="font-bold flex justify-center align-center py-5">Category not found</div>;
  }

  return (
    <>
      <h1 className="flex justify-center text-4xl font-bold mb-6 py-4" data-cy="category-name">
        {category.name}
      </h1>

    <div className="md:grid md:grid-cols-2 lg:grid-cols-3 gap-2">
      {products.map(product => (
        <Card key={product.id} className="flex flex-col" data-cy="product">
          <CardHeader>
            <CardTitle className="flex justify-center" data-cy="product-title">
              {product.name}
            </CardTitle>
          </CardHeader>
          <div className="flex-1"></div>
          <Link href={`/product/${product.name}/${product.id}`}>
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
          <CardFooter className="font-bold flex justify-between items-center">
            <CardDescription data-cy="product-price">
              ${product.price.toString()}
            </CardDescription>
            <AddToCartButton product={product} />
          </CardFooter>
        </Card>
      ))}
    </div>
    </>
  );
}
