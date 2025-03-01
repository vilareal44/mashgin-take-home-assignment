import type { CartItem } from '@/types/cart-item';
import type { MenuItem } from '@/types/menu-item';

import { create } from 'zustand';

interface CartStore {
  items: CartItem[];
  addItem: (item: MenuItem) => void;
  removeItem: (itemId: number) => void;
  incrementQuantity: (itemId: number) => void;
  decrementQuantity: (itemId: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
}

const initialState = {
  items: [],
};

export const useCartStore = create<CartStore>((set, get) => ({
  ...initialState,

  addItem: (item: MenuItem) => {
    const { items } = get();
    const existingItem = items.find((i) => i.id === item.id);

    if (existingItem) {
      set({
        items: items.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        ),
      });
    } else {
      set({ items: [...items, { ...item, quantity: 1 }] });
    }
  },

  removeItem: (itemId: number) => {
    const { items } = get();
    set({ items: items.filter((i) => i.id !== itemId) });
  },

  incrementQuantity: (itemId: number) => {
    const { items } = get();
    set({
      items: items.map((item) =>
        item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
      ),
    });
  },

  decrementQuantity: (itemId: number) => {
    const { items } = get();
    set({
      items: items
        .map((item) =>
          item.id === itemId ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0),
    });
  },

  clearCart: () => set(initialState),

  getTotalPrice: () => {
    const { items } = get();
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  },

  getTotalItems: () => {
    const { items } = get();
    return items.reduce((total, item) => total + item.quantity, 0);
  },
})); 