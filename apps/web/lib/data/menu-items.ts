export interface MenuItem {
  id: number;
  name: string;
  price: number;
  image: string;
}

const placeholderImage = "/images/placeholder.svg";

export const menuItemsMock: MenuItem[] = [
  {
    id: 1,
    name: "food 1",
    price: 1.00,
    image: placeholderImage
  },
  {
    id: 2,
    name: "food 2",
    price: 1.50,
    image: placeholderImage
  },
  {
    id: 3,
    name: "food 3",
    price: 3.00,
    image: placeholderImage
  },
]; 