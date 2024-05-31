import AddToCartButton from "@/components/AddToCartButton";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import {getBestSellingProducts} from "../actions/order";

export default async function Sales() {
  const products = await getBestSellingProducts();

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
            <CardContent className="flex justify-center">
              <Image src={image} alt="product image" width={150} height={150} />
            </CardContent>
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
