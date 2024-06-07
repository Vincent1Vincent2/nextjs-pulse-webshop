"use client";

import {useCart} from "@/app/contexts/CartContext";
import {CartItem} from "@/data";
import {MinusIcon, PlusIcon} from "lucide-react";
import {ReactNode, useEffect} from "react";
import {useFormContext} from "react-hook-form";

interface Props {
  cart: CartItem;
  children: ReactNode;
  index: number;
}

export function QuantityArrows({cart, children, index}: Props) {
  const {addToCart, removeFromCart} = useCart();
  const {setValue} = useFormContext(); // use react-hook-form's context

  useEffect(() => {
    setValue(`ProductOrder.${index}.quantity`, cart.quantity);
  }, [cart.quantity, setValue, index]);

  const handleIncrementProduct = () => {
    addToCart(cart);
  };

  const handleDecrementProduct = () => {
    removeFromCart(cart);
  };

  return (
    <div className="flex gap-3">
      <MinusIcon
        onClick={handleDecrementProduct}
        data-cy="decrease-quantity-button"
      />
      {children}
      <PlusIcon
        onClick={handleIncrementProduct}
        data-cy="increase-quantity-button"
      />
    </div>
  );
}
