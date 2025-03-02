import { Module } from '@nestjs/common';
import { MenuService } from './menu.service';
import { MenuController } from './menu.controller';
import { CoreModule } from '../core/core.module';

/**
 * Module for handling menu-related functionality
 */
@Module({
  imports: [CoreModule],
  controllers: [MenuController],
  providers: [MenuService],
})
export class MenuModule {}
