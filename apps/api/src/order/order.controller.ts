import { Controller, Post, Body, UsePipes } from '@nestjs/common';
import { OrderService } from './order.service';
import {
  CreateOrderDto,
  createOrderSchema,
  CreateOrderDtoSwagger
} from './dto/create-order.dto';
import { ZodValidationPipe } from 'src/core/pipes/zod-validation.pipe';
import { ApiOperation, ApiResponse, ApiTags, ApiBody } from '@nestjs/swagger';
import { OrderDto } from './dto/order.dto';

/**
 * Controller for managing order operations
 */
@ApiTags('order')
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  /**
   * Creates a new order
   * @param {CreateOrderDto} createOrderDto - The DTO containing the order data
   * @returns {Promise<OrderDto>} A promise resolving to the created orderDto
   */
  @ApiOperation({ summary: 'Create new order', description: 'Creates a new order with the provided order information' })
  @ApiBody({ type: CreateOrderDtoSwagger })
  @ApiResponse({ status: 201, description: 'The order has been successfully created', type: OrderDto })
  @ApiResponse({ status: 400, description: 'Bad request - validation failed' })
  @Post()
  @UsePipes(new ZodValidationPipe(createOrderSchema))
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.create(createOrderDto);
  }
}
