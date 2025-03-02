import { PrismaService } from '../core/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderDto } from './dto/order.dto';
import { Order } from '@prisma/client';
import { parseExpirationDate } from '../utils/date.utils';
import { OrderDtoMapper } from './dto/mappers/order-dto.mapper';

/**
 * Repository for managing order operations
 */
@Injectable()
export class OrderRepository {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Creates a new order
   * @param {CreateOrderDto} createOrderDto - The DTO containing the order data
   * @returns {Promise<OrderDto>} A promise resolving to the created orderDto
   */
  async create(createOrderDto: CreateOrderDto): Promise<OrderDto> {
    const {
      name,
      creditCardNumber,
      expirationDate,
      cvc,
      address,
      total,
      items,
    } = createOrderDto;

    const fullExpirationDate = parseExpirationDate(expirationDate);

    const order = await this.prisma.order.create({
      data: {
        total,
        items: {
          createMany: {
            data: items.map((item) => ({
              itemId: item.id,
              quantity: item.quantity,
            })),
          },
        },
        payment: {
          create: {
            name,
            amount: total,
            creditCardNumber,
            expirationDate: fullExpirationDate,
            cvc: parseInt(cvc),
            address,
          },
        },
      },
    });
    return OrderDtoMapper.mapToDto(order);
  }
}
