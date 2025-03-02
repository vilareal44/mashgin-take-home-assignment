import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderRepository } from './order.repository';
import { OrderDto } from './dto/order.dto';

/**
 * Service for managing order operations
 */
@Injectable()
export class OrderService {
  constructor(private readonly orderRepository: OrderRepository) {}

  /**
   * Creates a new order
   * @param {CreateOrderDto} createOrderDto - The DTO containing the order data
   * @returns {Promise<OrderDto>} A promise resolving to the created orderDto
   */
  async create(createOrderDto: CreateOrderDto): Promise<OrderDto> {
    return this.orderRepository.create(createOrderDto);
  }
}
