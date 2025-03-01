import axios from 'axios';
import type { MenuItem } from '@/types/menu-item';


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
export const fetchMenu = async (categoryId?: number): Promise<MenuItem[]> => {
  try {
    const params = categoryId ? { categoryId } : {};
    const response = await api.get<MenuItem[]>('/menu', { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching menu:', error);
    throw error;
  }
};

export default api; 