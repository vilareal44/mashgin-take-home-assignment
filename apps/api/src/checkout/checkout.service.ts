import { Injectable } from '@nestjs/common';
import { CreateCheckoutDto } from './dto/create-checkout.dto';
import { PrismaService } from 'src/shared/prisma.service';

/**
 * Service for managing checkout operations
 */
@Injectable()
export class CheckoutService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Creates a new checkout order
   * @param createCheckoutDto - The DTO containing the checkout data
   * @returns A promise resolving to the created checkout order
   */
  async create(createCheckoutDto: CreateCheckoutDto) {
    const {
      name,
      creditCardNumber,
      expirationDate,
      cvc,
      address,
      total,
      items,
    } = createCheckoutDto;

    // convert MM/YY expirationDate to Date object (YYYY-MM-DD)
    const [month, shortYear] = expirationDate.split('/');
    const year = 2000 + parseInt(shortYear);
    const fullExpirationDate = new Date(year, parseInt(month) - 1, 1);

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
    return order;
  }
}
