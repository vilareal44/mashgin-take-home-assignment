import { Controller, Post, Body, UsePipes } from '@nestjs/common';
import { CheckoutService } from './checkout.service';
import {
  CreateCheckoutDto,
  createCheckoutSchema,
} from './dto/create-checkout.dto';
import { ZodValidationPipe } from 'src/core/pipes/zod-validation.pipe';

/**
 * Controller for managing checkout operations
 */
@Controller('checkout')
export class CheckoutController {
  constructor(private readonly checkoutService: CheckoutService) {}

  /**
   * Creates a new checkout order
   * @param createCheckoutDto - The DTO containing the checkout data
   * @returns A promise resolving to the created checkout order
   */
  @Post()
  @UsePipes(new ZodValidationPipe(createCheckoutSchema))
  create(@Body() createCheckoutDto: CreateCheckoutDto) {
    return this.checkoutService.create(createCheckoutDto);
  }
}
