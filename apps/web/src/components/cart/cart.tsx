"use client";

import { CheckoutDialog } from "@/components/checkout/checkout-dialog";
import { useCartStore } from "@/lib/store/cart-store";
import { useState } from "react";

import { CartEmptyState } from "./cart-empty-state";
import { CartHeader } from "./cart-header";
import { CartFooter } from "./cart-footer";
import { CartItemList } from "./cart-item-list";

/**
 * Cart component that displays the user's selected items
 * Allows user to modify quantity, remove items, and checkout
 */
export function Cart() {
  const {
    items,
    getTotalPrice,
    getTotalItems,
    incrementQuantity,
    decrementQuantity,
    removeItem,
    clearCart
  } = useCartStore();
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  if (items.length === 0) {
    return <CartEmptyState />;
  }

  return (
    <>
      <div className="rounded-lg border">
        <CartHeader itemCount={getTotalItems()} onClear={clearCart} />
        <CartItemList
          items={items}
          onIncrement={incrementQuantity}
          onDecrement={decrementQuantity}
          onRemove={removeItem}
        />
        <CartFooter
          total={getTotalPrice()}
          onCheckout={() => setCheckoutOpen(true)}
        />
      </div>

      <CheckoutDialog open={checkoutOpen} onOpenChange={setCheckoutOpen} />
    </>
  );
}



