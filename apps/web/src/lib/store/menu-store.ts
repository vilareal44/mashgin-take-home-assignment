import type { MenuItem } from '@/types/menu-item';
import { create } from 'zustand';
import { fetchMenu } from '@/lib/api';

/**
 * Interface representing the state and actions for the menu items
 */
interface MenuState {
  menuItems: MenuItem[];
  loading: boolean;
  error: string | null;

  /** 
   * Fetches menu items from the API
   * @param {number} categoryId - Optional category ID to filter menu items
   * @returns {Promise<void>} Promise that resolves when menu items are fetched
   */
  fetchMenuItems: (categoryId?: number) => Promise<void>;
}

/*
 * Initial state for the menu store 
 */
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