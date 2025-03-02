import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { ZodSchema, ZodError } from 'zod';

/**
 * Validation pipe that uses Zod schemas to validate and transform request data
 */
@Injectable()
export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodSchema) {}

  /**
   * Transforms and validates the input value using the provided Zod schema
   * @param value - The value to transform and validate
   * @returns The transformed and validated value
   * @throws BadRequestException if validation fails
   */
  transform(value: unknown) {
    try {
      return this.schema.parse(value);
    } catch (error: unknown) {
      if (error instanceof ZodError) {
        throw new BadRequestException(`Request data validation failed: ${error.message}`);
      }
      throw new BadRequestException('Invalid request data');
    }
  }
}
