import { z } from 'zod';
import { ApiProperty } from '@nestjs/swagger';

/**
 * Schema for validating menu query parameters
 */
export const GetMenuQuerySchema = z.object({
  categoryId: z
    .string()
    .transform((val) => {
      const parsed = parseInt(val, 10);
      if (isNaN(parsed)) {
        throw new Error('categoryId must be a valid number');
      }
      return parsed;
    })
    .optional(),
});

/**
 * Type for menu query parameters
 */
export type GetMenuQueryDto = z.infer<typeof GetMenuQuerySchema>;

/**
 * Swagger documentation for menu query params
 */
export class GetMenuQueryDtoSwagger {
  @ApiProperty({
    description: 'Filter menu items by category ID',
    example: 1,
    required: false,
    type: Number
  })
  categoryId?: number;
}
