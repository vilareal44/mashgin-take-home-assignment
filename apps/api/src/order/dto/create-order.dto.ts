import { z } from 'zod';
import { ApiProperty } from '@nestjs/swagger';

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

/**
 * Swagger documentation for CreateOrderDto
 */
class OrderItemSwagger {
  @ApiProperty({
    description: 'Menu item Id',
    example: 1
  })
  id: number;

  @ApiProperty({
    description: 'Quantity of the item',
    example: 2,
    minimum: 1
  })
  quantity: number;
}

/**
 * Swagger documentation for createOrderDto
 */
export abstract class CreateOrderDtoSwagger {
  @ApiProperty({
    description: 'Customer name',
    example: 'Henrique V'
  })
  name: string;

  @ApiProperty({
    description: 'Credit card number',
    example: '1234 1324 1234 1234'
  })
  creditCardNumber: string;

  @ApiProperty({
    description: 'Credit card expiration date in MM/YY format',
    example: '01/99'
  })
  expirationDate: string;

  @ApiProperty({
    description: 'Credit card CVC',
    example: '123'
  })
  cvc: string;

  @ApiProperty({
    description: 'Delivery address',
    example: 'Mashgin St'
  })
  address: string;

  @ApiProperty({
    description: 'Total amount value in dolars',
    example: 15.00,
    minimum: 1
  })
  total: number;

  @ApiProperty({
    description: 'Order items',
    type: [OrderItemSwagger],
    minItems: 1
  })
  items: OrderItemSwagger[];
}
