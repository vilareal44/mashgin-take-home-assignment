import { Order } from '@prisma/client';
import { OrderDto } from '../order.dto';

/**
 * Mapper for converting Order entity to OrderDto
 */
export class OrderDtoMapper {
  /**
   * Maps a database Order entity to an OrderDto
   * @param {Order} order - The Order entity from the database
   * @returns {OrderDto} The mapped OrderDto
   */
  public static mapToDto(order: Order): OrderDto {
    const { id, total, createdAt } = order;

    return {
      id,
      total,
      createdAt,
    } as OrderDto;
  }
} 