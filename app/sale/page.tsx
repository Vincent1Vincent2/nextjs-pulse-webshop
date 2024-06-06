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
import {getBestSellingProducts} from "../actions/order";

export default async function Sales() {
  const products = await getBestSellingProducts();
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h2 style={{color: "#fff"}}>Best seller</h2>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2 max-w-7xl lg:mx-auto mx-5 mt-5">
        {products.map(({id, name, image, price, ...rest}) => (
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
                  src={image}
                  alt="product image"
                  width={150}
                  height={150}
                />
              </CardContent>
            </Link>
            <CardFooter className="flex justify-between items-center">
              <span data-cy="product-price">${price}</span>
              <AddToCartButton product={{id, name, price, image, ...rest}} />
            </CardFooter>
          </Card>
        ))}
      </div>
    </>
  );
}
