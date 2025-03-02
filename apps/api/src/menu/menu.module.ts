import { Module } from '@nestjs/common';
import { MenuService } from './menu.service';
import { MenuController } from './menu.controller';
import { CoreModule } from '../core/core.module';
import { MenuItemRepository } from './menu.repository';

/**
 * Module for handling menu-related functionality
 */
@Module({
  imports: [CoreModule],
  controllers: [MenuController],
  providers: [MenuService, MenuItemRepository],
})
export class MenuModule {}
