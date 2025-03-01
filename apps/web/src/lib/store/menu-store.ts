import type { MenuItem } from '@/types/menuItem';
import { create } from 'zustand';
import { fetchMenu } from '@/lib/api';

interface MenuState {
  menuItems: MenuItem[];
  loading: boolean;
  error: string | null;
  fetchMenuItems: (categoryId?: number) => Promise<void>;
}

const initialState = {
  menuItems: [],
  loading: false,
  error: null,
};

export const useMenuStore = create<MenuState>((set) => ({
  ...initialState,

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