"use client";

import type { CartItem } from "@/types/cart-item";
import { CartItemRow } from "./cart-item-row";

/**
 * List of items in the cart
 */
interface CartItemListProps {
  items: CartItem[];
  onIncrement: (id: number) => void;
  onDecrement: (id: number) => void;
  onRemove: (id: number) => void;
}

export function CartItemList({ items, onIncrement, onDecrement, onRemove }: CartItemListProps) {
  return (
    <div className="divide-y">
      {items.map((item) => (
        <CartItemRow
          key={item.id}
          item={item}
          onIncrement={() => onIncrement(item.id)}
          onDecrement={() => onDecrement(item.id)}
          onRemove={() => onRemove(item.id)}
        />
      ))}
    </div>
  );
}