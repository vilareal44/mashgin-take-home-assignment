"use client";

import type { CartItem } from "@/types/cart-item";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

/**
 * Single cart item row component
 */
interface CartItemRowProps {
  item: CartItem;
  onIncrement: () => void;
  onDecrement: () => void;
  onRemove: () => void;
}

export function CartItemRow({ item, onIncrement, onDecrement, onRemove }: CartItemRowProps) {
  return (
    <div className="flex items-center justify-between p-4">
      <div className="flex-1">
        <h4 className="font-medium">{item.name}</h4>
        <p className="text-sm text-muted-foreground">${item.price.toFixed(2)} each</p>
      </div>
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="sm"
          className="text-destructive text-xs h-7 px-2"
          onClick={onRemove}
        >
          Remove
        </Button>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={onDecrement}
          >
            -
          </Button>
          <Badge variant="secondary">{item.quantity}</Badge>
          <Button
            variant="outline"
            size="icon"
            onClick={onIncrement}
          >
            +
          </Button>
        </div>
        <div className="w-20 text-right font-medium">
          ${(item.price * item.quantity).toFixed(2)}
        </div>
      </div>
    </div>
  );
}