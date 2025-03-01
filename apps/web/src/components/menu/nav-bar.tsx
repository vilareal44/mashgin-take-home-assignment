"use client";

import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { useCartStore } from "@/lib/store/cart-store";

/**
 * Navigation bar component shown at the too
 */
export function NavBar() {
  const { getTotalItems } = useCartStore();
  const totalItems = getTotalItems();

  return (
    <header className="border-b py-4">
      <div className="container mx-auto flex items-center justify-between px-4">
        <Link href="/" className="text-lg font-medium">
          Mashgin Menu
        </Link>
        <div className="flex items-center gap-1">
          <span className="text-sm font-medium">Cart</span>
          {totalItems > 0 && (
            <Badge variant="secondary">
              {totalItems}
            </Badge>
          )}
        </div>
      </div>
    </header>
  );
} 