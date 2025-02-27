import { Module } from '@nestjs/common';
import { SharedModule } from './shared/shared.module';
import { PrismaService } from './shared/prisma.service';

@Module({
  imports: [SharedModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule { }
