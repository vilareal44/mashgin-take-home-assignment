"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckoutDialog } from "../checkout/checkout-dialog";
import { useCartStore } from "@/lib/store/cart-store";
import { useState } from "react";

export function Cart() {
  const { items, getTotalPrice, getTotalItems, incrementQuantity, decrementQuantity, removeItem, clearCart } = useCartStore();
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  if (items.length === 0) {
    return (
      <div className="rounded-lg border p-6 text-center">
        <h3 className="text-lg font-medium">Your cart is empty</h3>
        <p className="mt-2 text-sm text-muted-foreground">Add items to your cart to see them here.</p>
      </div>
    );
  }

  return (
    <>
      <div className="rounded-lg border">
        <div className="p-4 border-b flex items-center justify-between">
          <div>
            <h3 className="text-lg font-medium">Your Cart</h3>
            <p className="text-sm text-muted-foreground">
              {getTotalItems()} item{getTotalItems() !== 1 ? "s" : ""}
            </p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="text-muted-foreground"
            onClick={clearCart}
          >
            Clear
          </Button>
        </div>
        <div className="divide-y">
          {items.map((item) => (
            <div key={item.id} className="flex items-center justify-between p-4">
              <div className="flex-1">
                <h4 className="font-medium">{item.name}</h4>
                <p className="text-sm text-muted-foreground">${item.price.toFixed(2)} each</p>
              </div>
              <div className="flex items-center gap-3">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-destructive text-xs h-7 px-2"
                  onClick={() => removeItem(item.id)}
                >
                  Remove
                </Button>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => decrementQuantity(item.id)}
                  >
                    -
                  </Button>
                  <Badge variant="secondary">{item.quantity}</Badge>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => incrementQuantity(item.id)}
                  >
                    +
                  </Button>
                </div>
                <div className="w-20 text-right font-medium">
                  ${(item.price * item.quantity).toFixed(2)}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="p-4 border-t">
          <div className="flex items-center justify-between font-medium">
            <span>Total</span>
            <span>${getTotalPrice().toFixed(2)}</span>
          </div>
          <Button className="w-full mt-4" onClick={() => setCheckoutOpen(true)}>
            Checkout
          </Button>
        </div>
      </div>

      <CheckoutDialog open={checkoutOpen} onOpenChange={setCheckoutOpen} />
    </>
  );
} 