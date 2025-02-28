import { Injectable } from '@nestjs/common';
import { CreateCheckoutDto } from './dto/create-checkout.dto';
import { PrismaService } from 'src/shared/prisma.service';

@Injectable()
export class CheckoutService {
  constructor(private readonly prisma: PrismaService) { }

  async create(createCheckoutDto: CreateCheckoutDto) {
    const { name, creditCardNumber, expirationDate, cvc, address, total, items } = createCheckoutDto;
    const order = await this.prisma.order.create({
      data: {
        total,
        items: {
          createMany: {
            data: items.map(item => ({
              itemId: item.id,
              quantity: item.quantity,
            }))
          }
        },
        payment: {
          create: {
            name,
            amount: total,
            creditCardNumber,
            expirationDate: new Date(`${expirationDate.split('/')[1]}-${expirationDate.split('/')[0]}-01`),
            cvc: parseInt(cvc),
            address,
          }
        }
      }
    })
    return order;
  }
}
