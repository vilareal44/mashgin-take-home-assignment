import type { MenuCategory } from "./menu-category";

export interface MenuItem {
  id: number;
  imageId: string;
  name: string;
  price: number;
  category: MenuCategory;
}