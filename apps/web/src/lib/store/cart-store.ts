import type { CartItem } from '@/types/cart-item';
import type { MenuItem } from '@/types/menu-item';

import { create } from 'zustand';

/**
 * Interface representing the shopping cart state and actions
 */
interface CartStore {
  items: CartItem[];

  /** 
   * Adds a menu item to the cart
   * @param {MenuItem} item - The menu item to add to the cart
   */
  addItem: (item: MenuItem) => void;

  /** 
   * Removes an item from the cart
   * @param {number} itemId - The ID of the item to remove
   */
  removeItem: (itemId: number) => void;

  /** 
   * Increases the quantity of an item in the cart by 1
   * @param {number} itemId - The ID of the item to increment
   */
  incrementQuantity: (itemId: number) => void;

  /** 
   * Decreases the quantity of an item in the cart by 1
   * If quantity becomes 0, the item is removed from the cart
   * @param {number} itemId - The ID of the item to decrement
   */
  decrementQuantity: (itemId: number) => void;

  /** Removes all items from the cart */
  clearCart: () => void;

  /** 
   * Calculates the total price of all items in the cart
   * @returns {number} The total price
   */
  getTotalPrice: () => number;

  /** 
   * Calculates the total number of items in the cart
   * @returns {number} The total quantity of all items
   */
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