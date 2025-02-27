import { Module } from '@nestjs/common';
import { SharedModule } from './shared/shared.module';
import { PrismaService } from './shared/prisma.service';
import { MenuModule } from './menu/menu.module';
@Module({
  imports: [SharedModule, MenuModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule { }
