import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { CoreModule } from '../core/core.module';
import { OrderRepository } from './order.repository';
@Module({
  imports: [CoreModule],
  controllers: [OrderController],
  providers: [OrderService, OrderRepository],
})
export class OrderModule {}
