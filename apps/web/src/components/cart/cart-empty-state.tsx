"use client";

/**
 * Component displayed when the cart is empty
 */
export function CartEmptyState() {
  return (
    <div className="rounded-lg border p-6 text-center">
      <h3 className="text-lg font-medium">Your cart is empty</h3>
      <p className="mt-2 text-sm text-muted-foreground">Add items to your cart to see them here.</p>
    </div>
  );
}

