import { Controller, Post, Body, UsePipes } from '@nestjs/common';
import { OrderService } from './order.service';
import {
  CreateOrderDto,
  createOrderSchema,
} from './dto/create-order.dto';
import { ZodValidationPipe } from 'src/core/pipes/zod-validation.pipe';

/**
 * Controller for managing order operations
 */
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  /**
   * Creates a new order
   * @param {CreateOrderDto} createOrderDto - The DTO containing the order data
   * @returns {Promise<OrderDto>} A promise resolving to the created orderDto
   */
  @Post()
  @UsePipes(new ZodValidationPipe(createOrderSchema))
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.create(createOrderDto);
  }
}
