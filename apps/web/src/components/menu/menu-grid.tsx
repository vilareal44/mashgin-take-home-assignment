"use client";

import { useEffect } from "react";

import { ErrorAlert } from "./error-alert";
import { MenuItemCard } from "./menu-item-card";
import { useMenuStore } from "@/lib/store/menu-store";
import { LoadingSpinner } from "../ui/loading-spinner";

/**
 * Component that displays a grid of menu items
 * Fetches menu items from the store and handles loading/error states
 */
export function MenuGrid() {
  const { menuItems, loading, error, fetchMenuItems } = useMenuStore();

  useEffect(() => {
    fetchMenuItems();
  }, [fetchMenuItems]);

  if (loading) {
    return <LoadingSpinner className="w-10 h-10 mx-auto" />;
  }

  if (error) {
    return <ErrorAlert message={error} onRetry={fetchMenuItems} />
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {menuItems.map((item) => (
        <MenuItemCard key={item.id} item={item} />
      ))}
    </div>
  );
}
