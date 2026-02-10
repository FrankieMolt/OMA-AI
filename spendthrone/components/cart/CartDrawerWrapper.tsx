/**
 * CartDrawerWrapper - Client component wrapper for cart drawer
 */

'use client';

import { CartDrawer } from './CartDrawer';
import { useApp } from '@/components/providers/AppProvider';

export function CartDrawerWrapper() {
  const { isCartOpen, toggleCart, cartTotal, cartCount } = useApp();

  const handleCheckout = () => {
    console.log('Checkout clicked', { cartTotal, cartCount });
    toggleCart();
  };

  return (
    <CartDrawer
      isOpen={isCartOpen}
      onClose={toggleCart}
      onCheckout={handleCheckout}
    />
  );
}
