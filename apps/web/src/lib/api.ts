import axios from 'axios';
import type { MenuItem } from '@/types/menu-item';
import type { CheckoutData } from '@/types/checkout-data';

const API_HOST = process.env.NEXT_PUBLIC_API_HOST || 'http://localhost:3001';

const api = axios.create({
  baseURL: API_HOST,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Fetches the menu items based on the provided category ID
 * @param categoryId - [optional] The ID of the category to filter the menu items by
 * @returns A promise resolving to an array of menu items
 */
const fetchMenu = async (categoryId?: number): Promise<MenuItem[]> => {
  try {
    const params = categoryId ? { categoryId } : {};
    const response = await api.get<MenuItem[]>('/menu', { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching menu:', error);
    throw error;
  }
};

/**
 * Handles the checkout process
 * @param checkoutData - The checkout data to be processed
 * @returns A promise resolving to the order ID
 */
const checkout = async (checkoutData: CheckoutData): Promise<{ id: string }> => {
  try {
    const response = await api.post('/order', checkoutData);
    return response.data;
  } catch (error) {
    console.error('Error during checkout:', error);
    throw error;
  }
};

/**
 * Exports only the API functions
 */
export { fetchMenu, checkout };