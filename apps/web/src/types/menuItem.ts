import type { MenuCategory } from "./menuCategory";

export interface MenuItem {
  id: number;
  imageId: string;
  name: string;
  price: number;
  category: MenuCategory;
}