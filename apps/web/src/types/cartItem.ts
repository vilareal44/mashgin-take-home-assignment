import type { MenuItem } from "./menuItem";

export interface CartItem extends MenuItem {
  quantity: number;
}
