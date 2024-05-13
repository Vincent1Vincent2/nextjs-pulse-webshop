"use client";

import { useCart } from "@/app/contexts/CartContext";
import { Product } from "@/data";
import { Button } from "./ui/button";

interface Props {
  product: Product;
}

function DeleteButton(props: Props) {
  const { removeFromCart } = useCart();

  function handleRemoaval() {
    removeFromCart(props.product);
  }

  return <Button onClick={handleRemoaval}>Ta bort</Button>;
}

export default DeleteButton;
