"use client";

import {useCart} from "@/app/contexts/CartContext";
import {Product} from "@prisma/client";
import {Button} from "./ui/button";

interface Props {
  product: Product;
}

function AddToCartButton(props: Props) {
  const {addToCart} = useCart();

  function handleBuy() {
    addToCart(props.product);
  }

  return (
    <Button onClick={handleBuy} data-cy="product-buy-button">
      Add to cart
    </Button>
  );
}

export default AddToCartButton;
