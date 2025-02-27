/**
 * DTO for creating a checkout order
 */
export class CreateCheckoutDto {
  name: string;
  creditCardNumber: string;
  expirationDate: string;
  cvc: string;
  address: string;
  total: number;
  items: {
    id: number;
    quantity: number;
  }[];
}


