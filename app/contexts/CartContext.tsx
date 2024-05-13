"use client";

import { toast } from "@/components/ui/use-toast";
import { CartItem, Product } from "@/data";
import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

interface ContextValue {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  clearCartProduct: (product: Product) => void;
  removeFromCart: (product: Product) => void;
  clearCart: () => void;
}

const CartContext = createContext<ContextValue>({} as ContextValue);

export function CartProvider(props: PropsWithChildren) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (product: Product) => {
    //Find index of cart item
    const cartItemIndex = cart.findIndex((item) => item.id === product.id);
    //If item id exists, retrieve cart array, increment quantity of selected item by 1. Refresh cart to reflect new quantity, if id doesn't exist = set quantity to 1

    if (cartItemIndex !== -1) {
      setCart(
        cart.map(
          (item) =>
            item.id === product.id // är vi på produkten som ska förändras?
              ? { ...item, quantity: item.quantity + 1 } // applicera förändingen
              : item // behåll produkten som den är
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
    toast({
      title: `${product.title}`,
    });
  };

  const clearCartProduct = (product: Product) => {
    setCart(cart.filter((item) => item.id !== product.id));
  };

  const removeFromCart = (product: Product) => {
    const cartItemIndex = cart.findIndex((item) => item.id === product.id);
    if (cartItemIndex !== -1) {
      const updatedCart = [...cart];
      if (updatedCart[cartItemIndex].quantity === 1) {
        clearCartProduct(product);
      } else {
        updatedCart[cartItemIndex].quantity -= 1; // mutation
        setCart(updatedCart);
      }
    }
  };

  const clearCart = () => {
    setCart([]);
  };

  useEffect(() => {
    const lsCart = localStorage.getItem("cart");
    if (lsCart) {
      setCart(JSON.parse(lsCart));
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (!isLoaded) return;
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart, isLoaded]);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        clearCartProduct,
        removeFromCart,
        clearCart,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);

export default CartProvider;
