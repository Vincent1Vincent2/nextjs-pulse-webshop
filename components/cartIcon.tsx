'use client';

import { useCart } from '@/app/contexts/CartContext';
import { ShoppingCartIcon } from 'lucide-react';

function CartIcon() {
  const { cart } = useCart();

  const cartQuantity = cart.reduce(
    (total, product) => total + product.quantity,
    0
  );

  return (
    <div className='relative flex items-center transition-all p-2'>
      <div>
        <ShoppingCartIcon width={35} height={35} />
      </div>
      {cart.length > 0 && (
        <div
          className='flex absolute justify-center -top-2 right-0 animate-accordion-up'
          data-cy='cart-items-count-badge'
        >
          <div>{cartQuantity}</div>
        </div>
      )}
    </div>
  );
}

export default CartIcon;
