import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

/**
 * Core module that provides application-wide services and configurations
 */
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class CoreModule {}
