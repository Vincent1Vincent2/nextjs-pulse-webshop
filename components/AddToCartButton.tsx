"use client";

import {useCart} from "@/app/contexts/CartContext";
import {Product} from "@/data";
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
    <Button className="text-color-black bg-transparent border-2 border-orange-400 transition duration-500 hover:scale-125 hover:bg-transparent shadow-lg transform active:scale-75 transition-transform" onClick={handleBuy} data-cy="product-buy-button">
      Add to cart
    </Button>
  );
}

export default AddToCartButton;
