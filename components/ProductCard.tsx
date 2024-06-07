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
      className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-300 w-82 ld:w-[300px] h-auto items-center"
      // style={{width: "300px", height: "auto"}}
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
          <div className="flex justify-center backdrop-blur-sm bg-white/30 items-center h-full">
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

        {/* Price and Button */}
        <div className="p-2 flex justify-between items-center">
          <span className="font-semibold pl-6" data-cy="product-price">
            ${product.price}
          </span>
          <AddToCartButton product={product} />
        </div>
      </div>
    </Card>
  );
}
