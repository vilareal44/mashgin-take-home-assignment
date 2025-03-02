import { Controller, Get, Query, UsePipes } from '@nestjs/common';
import { MenuService } from './menu.service';
import { GetMenuQueryDto, GetMenuQuerySchema } from './dto/get-menu.dto';
import { ZodValidationPipe } from '../core/pipes/zod-validation.pipe';
import { MenuDto } from './dto/menu.dto';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

/**
 * Controller for managing menu items
 */
@ApiTags('menu')
@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  /**
   * Retrieves the menu items based on the provided optional categoryId
   * @param {GetMenuQueryDto} query - The query parameters for filtering menu items (currently only categoryId)
   * @returns {Promise<MenuDto[]>} A promise resolving to an array of MenuDto
   */
  @ApiOperation({ summary: 'Get menu items', description: 'Retrieves menu items, optionally filtered by category' })
  @ApiQuery({ name: 'categoryId', required: false, description: 'Filter by categoryId', type: Number })
  @ApiResponse({ status: 200, description: 'Menu items retrieved successfully', type: [MenuDto] })
  @ApiResponse({ status: 400, description: 'Bad request - query param validation failed' })
  @ApiResponse({ status: 404, description: 'Not found - no menu items found for the given category' })
  @Get()
  @UsePipes(new ZodValidationPipe(GetMenuQuerySchema))
  getMenu(@Query() query: GetMenuQueryDto): Promise<MenuDto[]> {
    return this.menuService.getMenu(query.categoryId);
  }
}
