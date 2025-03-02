import { z } from 'zod';

/**
 * Create Order DTO schema for validation using Zod
 */
export const createOrderSchema = z
  .object({
    name: z.string().min(1, 'Name is required'),
    creditCardNumber: z.string().min(1, 'Credit card number is required'),
    expirationDate: z
      .string()
      .min(1, 'Expiration date is required')
      .regex(
        /^(0[1-9]|1[0-2])\/([0-9]{2})$/,
        'Expiration must be in MM/YY format',
      ),
    cvc: z.string().min(1, 'CVC is required'),
    address: z.string().min(1, 'Address is required'),
    total: z.number().min(1, 'Total is required'),
    items: z
      .array(
        z.object({
          id: z.number().int().min(1, 'Item ID is required'),
          quantity: z.number().int().min(1, 'Quantity is required'),
        }),
      )
      .min(1, 'At least one item is required'),
  })
  .required();

/**
 * Create Order DTO type
 */
export type CreateOrderDto = z.infer<typeof createOrderSchema>;
