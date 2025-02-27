import { Injectable } from '@nestjs/common';
import { CreateCheckoutDto } from './dto/create-checkout.dto';
import { PrismaService } from 'src/shared/prisma.service';

@Injectable()
export class CheckoutService {
  constructor(private readonly prisma: PrismaService) { }

  create(createCheckoutDto: CreateCheckoutDto) {
    const { name, creditCardNumber, expirationDate, cvc, address, total, items } = createCheckoutDto;
    this.prisma.order.create({
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
            amount: total,
            creditCardNumber,
            expirationDate: new Date(expirationDate),
            cvc: parseInt(cvc),
            address,
          }
        }
      }
    })
  }
}
