import { z } from 'zod';

/**
 * Schema for validating menu query parameters
 */
export const GetMenuQuerySchema = z.object({
  categoryId: z
    .string()
    .transform((val) => parseInt(val, 10))
    .optional(),
});

/**
 * Type for menu query parameters
 */
export type GetMenuQueryDto = z.infer<typeof GetMenuQuerySchema>;
