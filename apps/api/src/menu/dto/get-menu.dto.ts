import { z } from 'zod';

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
