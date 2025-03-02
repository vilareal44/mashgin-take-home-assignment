import type { CartItem } from "./cart-item";

export interface CheckoutData {
  name: string;
  creditCardNumber: string;
  expirationDate: string;
  cvc: string;
  address: string;
  total: number;
  items: CartItem[];
}