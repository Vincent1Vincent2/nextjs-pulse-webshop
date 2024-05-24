"use client";
import {useCart} from "@/app/contexts/CartContext";
import {LiaShoppingBagSolid} from "react-icons/lia";
function CartIcon() {
  const {cart} = useCart();

  const cartQuantity = cart.reduce(
    (total, product) => total + product.quantity,
    0,
  );

  return (
    <div className="relative flex items-center transition-all">
      <div>
        <LiaShoppingBagSolid className=" size-8" />
      </div>
      {cart.length > 0 && (
        <div
          className="flex absolute justify-center -top-2 -right-2 animate-accordion-up"
          data-cy="cart-items-count-badge"
        >
          <div className=" flex  size-6 rounded-full justify-center items-center bg-violet-300 text-black">
            {cartQuantity}
          </div>
        </div>
      )}
    </div>
  );
}

export default CartIcon;
