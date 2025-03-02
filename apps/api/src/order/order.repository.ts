import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { PrismaService } from 'src/core/prisma.service';
import { OrderDto } from './dto/order.dto';
import { Order } from '@prisma/client';

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

    const fullExpirationDate = this.parseExpirationDate(expirationDate);

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
    return this.mapToDto(order);
  }

  /**
   * Parses the expiration date from MM/YY format to a Date object
   * @param {string} expirationDate - The expiration date in MM/YY format
   * @returns {Date} The parsed expiration date
   */
  private parseExpirationDate(expirationDate: string) {
    const [month, shortYear] = expirationDate.split('/');
    const year = 2000 + parseInt(shortYear);
    return new Date(year, parseInt(month) - 1, 1);
  }

  // mapper to convert the db entity to the DTO
  private mapToDto(order: Order): OrderDto {
    const { id, total, createdAt } = order;

    return {
      id,
      total,
      createdAt,
    } as OrderDto;
  }
}
