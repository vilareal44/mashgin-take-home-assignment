"use client";

import { Button } from "@/components/ui/button";

/**
 * Header component for the cart
 */
interface CartHeaderProps {
  itemCount: number;
  onClear: () => void;
}

export function CartHeader({ itemCount, onClear }: CartHeaderProps) {
  return (
    <div className="p-4 border-b flex items-center justify-between">
      <div>
        <h3 className="text-lg font-medium">Your Cart</h3>
        <p className="text-sm text-muted-foreground">
          {itemCount} item{itemCount !== 1 ? "s" : ""}
        </p>
      </div>
      <Button
        variant="ghost"
        size="sm"
        className="text-muted-foreground"
        onClick={onClear}
      >
        Clear
      </Button>
    </div>
  );
}