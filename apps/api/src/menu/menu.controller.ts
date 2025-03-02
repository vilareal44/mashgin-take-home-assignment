import { Controller, Get, Query, UsePipes } from '@nestjs/common';
import { MenuService, MenuItemWithCategory } from './menu.service';
import { GetMenuQueryDto, GetMenuQuerySchema } from './models';
import { ZodValidationPipe } from '../core/pipes/zod-validation.pipe';

/**
 * Controller for managing menu items
 */
@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  /**
   * Retrieves the menu items based on the provided category ID
   * @param query - The query parameters for filtering menu items
   * @returns A promise resolving to an array of menu items with their categories
   */
  @Get()
  @UsePipes(new ZodValidationPipe(GetMenuQuerySchema))
  getMenu(@Query() query: GetMenuQueryDto): Promise<MenuItemWithCategory[]> {
    return this.menuService.getMenu(query.categoryId);
  }
}
