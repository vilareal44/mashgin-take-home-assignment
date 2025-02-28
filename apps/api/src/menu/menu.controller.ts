import { Controller, Get, Query, ParseIntPipe } from '@nestjs/common';
import { MenuService } from './menu.service';

/**
 * Controller for managing menu items
 */
@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) { }

  /**
   * Retrieves the menu items based on the provided category ID
   * @param categoryId - The ID of the category to filter the menu items by
   * if no categoryId is provided, all menu items are returned
   * @returns A promise resolving to an array of menu items
   */
  @Get()
  getMenu(@Query('categoryId', new ParseIntPipe({ optional: true })) categoryId?: number) {
    return this.menuService.getMenu(categoryId);
  }
}
