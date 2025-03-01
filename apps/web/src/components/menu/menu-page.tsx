"use client";

import { MenuGrid } from "./menu-grid";
import { Cart } from "./cart";

export function MenuPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-medium mb-6">Menu</h1>
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <MenuGrid />
        </div>
        <div className="lg:col-span-1">
          <div className="sticky top-8">
            <Cart />
          </div>
        </div>
      </div>
    </div>
  );
} 