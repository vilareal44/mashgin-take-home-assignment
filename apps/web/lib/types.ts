export interface MenuItem {
  id: number;
  imageId: string;
  name: string;
  price: number;
  category: MenuCategory;
}

export interface MenuCategory {
  id: number;
  imageId: string;
  name: string;
}