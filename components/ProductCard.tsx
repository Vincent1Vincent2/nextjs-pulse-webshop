import {Product} from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import AddToCartButton from "./AddToCartButton";
import {Card} from "./ui/card";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({product}: ProductCardProps) {
  return (
    <Card
      key={product.id}
      className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg"
      style={{
        width: "100%",
        maxWidth: "300px",
        margin: "5px",
        height: "400px",
      }}
    >
      <div className="flex flex-col h-full">
        {/* Title */}
        <div className="p-4 h-20">
          <h2
            className="flex justify-center text-center text-lg font-semibold"
            data-cy="product-title"
          >
            {product.name}
          </h2>
        </div>

        {/* Image */}
        <Link
          href={`/product/${product.name}/${product.id}`}
          className="flex-grow"
        >
          <div className="flex justify-center items-center h-48">
            <Image
              src={product.image || "/placeholder-image.jpg"}
              alt="product image"
              layout="intrinsic"
              width={250}
              height={250}
              className="object-cover"
            />
          </div>
        </Link>

        {/* Price and Button */}
        <div className="p-4 flex justify-between items-center">
          <span className="font-semibold" data-cy="product-price">
            ${product.price}
          </span>
          <AddToCartButton product={product} />
        </div>
      </div>
    </Card>
  );
}
