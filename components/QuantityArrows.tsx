"use client";

import { useCart } from "@/app/contexts/CartContext";
import { CartItem } from "@/data";
import { MinusIcon, PlusIcon } from "lucide-react";
import { ReactNode } from "react";

interface Props {
  cart: CartItem;
  children: ReactNode;
}

export function QuantityArrows(props: Props) {
  const { addToCart, removeFromCart } = useCart();

  const handleIncrementProduct = () => {
    addToCart(props.cart);
  };

  const handleDecrementProduct = () => {
    removeFromCart(props.cart);
  };

  return (
    <div className="flex gap-3">
      <MinusIcon
        onClick={handleDecrementProduct}
        data-cy="decrease-quantity-button"
      />
      {props.children}
      <PlusIcon
        onClick={handleIncrementProduct}
        data-cy="increase-quantity-button"
      />
    </div>
  );
}
