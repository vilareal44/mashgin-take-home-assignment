export interface MenuDto {
  id: number;
  name: string;
  imageId: string;
  price: number;
  categoryId: number;
  category: MenuCategoryDto;
}

interface MenuCategoryDto {
  id: number;
  name: string;
  imageId: string;
}

