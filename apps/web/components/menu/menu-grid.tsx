"use client";

import { useEffect, useCallback } from "react";
import { MenuItemCard } from "./menu-item-card";
import { useMenuStore } from "@/lib/store/menu-store";
import { ErrorAlert } from "./error-alert";

export function MenuGrid() {
  const { menuItems, loading, error, fetchMenuItems } = useMenuStore();

  const handleFetchMenuItems = useCallback(() => {
    fetchMenuItems();
  }, [fetchMenuItems]);

  useEffect(() => {
    handleFetchMenuItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <ErrorAlert message={error} onRetry={handleFetchMenuItems} />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {menuItems.map((item) => (
            <MenuItemCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {menuItems.map((item) => (
        <MenuItemCard key={item.id} item={item} />
      ))}
    </div>
  );
} 