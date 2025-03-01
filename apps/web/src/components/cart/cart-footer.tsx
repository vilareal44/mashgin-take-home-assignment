"use client";

import { Button } from "@/components/ui/button";

/**
 * Footer component with total and checkout button
 */
interface CartFooterProps {
  total: number;
  onCheckout: () => void;
}

export function CartFooter({ total, onCheckout }: CartFooterProps) {
  return (
    <div className="p-4 border-t">
      <div className="flex items-center justify-between font-medium">
        <span>Total</span>
        <span>${total.toFixed(2)}</span>
      </div>
      <Button className="w-full mt-4" onClick={onCheckout}>
        Checkout
      </Button>
    </div>
  );
} 