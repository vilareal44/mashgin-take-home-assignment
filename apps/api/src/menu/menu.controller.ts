import { Controller, Get, Query, UsePipes } from '@nestjs/common';
import { MenuService } from './menu.service';
import { GetMenuQueryDto, GetMenuQuerySchema } from './dto/get-menu.dto';
import { ZodValidationPipe } from '../core/pipes/zod-validation.pipe';
import { MenuDto } from './dto/menu.dto';

/**
 * Controller for managing menu items
 */
@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  /**
   * Retrieves the menu items based on the provided optional categoryId
   * @param {GetMenuQueryDto} query - The query parameters for filtering menu items (currently only categoryId)
   * @returns {Promise<MenuDto[]>} A promise resolving to an array of MenuDto
   */
  @Get()
  @UsePipes(new ZodValidationPipe(GetMenuQuerySchema))
  getMenu(@Query() query: GetMenuQueryDto): Promise<MenuDto[]> {
    return this.menuService.getMenu(query.categoryId);
  }
}
