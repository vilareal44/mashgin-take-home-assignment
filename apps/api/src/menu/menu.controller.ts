import { Controller, Get, Query } from '@nestjs/common';
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
  getMenu(@Query('categoryId') categoryId?: string) {
    const categoryIdNumber = categoryId ? parseInt(categoryId, 10) : undefined;
    return this.menuService.getMenu(categoryIdNumber);
  }
}
