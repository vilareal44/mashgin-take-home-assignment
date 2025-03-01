import { create } from 'zustand';
import { MenuItem } from '@/src/lib/types';
import { fetchMenu } from '@/src/lib/api';

interface MenuState {
  menuItems: MenuItem[];
  loading: boolean;
  error: string | null;
  fetchMenuItems: (categoryId?: number) => Promise<void>;
}

export const useMenuStore = create<MenuState>((set) => ({
  menuItems: [],
  loading: false,
  error: null,
  fetchMenuItems: async (categoryId?: number) => {
    try {
      set({ loading: true, error: null });

      const data = await fetchMenu(categoryId);
      set({ menuItems: data, error: null });
    } catch (err) {
      console.error("Failed to fetch menu items:", err);
      set({
        error: "Unable to load menu items. Please try again later.",
        menuItems: []
      });
    } finally {
      set({ loading: false });
    }
  },
})); 