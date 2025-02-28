"use client";

import { menuItemsMock } from "@/lib/data/menu-items";
import { MenuItemCard } from "./menu-item-card";

export function MenuGrid() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {menuItemsMock.map((item) => (
        <MenuItemCard key={item.id} item={item} />
      ))}
    </div>
  );
} 