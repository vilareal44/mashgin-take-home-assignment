import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../core/prisma.service';
import { MenuDto } from './dto/menu.dto';
import { MenuDtoMapper, type MenuItemWithCategoryRaw } from './dto/mappers/menu-dto-mapper';

/**
 * Repository for retrieving menu items from the database using Prisma client.
 */
@Injectable()
export class MenuItemRepository {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Retrieves menu items from the database based on the provided category ID.
   * @param {number?} categoryId - optional - The ID of the category to filter the menu items by.
   * @returns {Promise<MenuDto[]>} A promise resolving to an array of MenuDto.
   * @throws {NotFoundException} If the category is provided but not found.
   */
  async getMenu(categoryId?: number): Promise<MenuDto[]> {
    if (categoryId) {
      const category = await this.prisma.menuCategory.findUnique({
        where: {
          id: categoryId,
        },
      });

      if (!category) {
        throw new NotFoundException('Category not found');
      }
    }

    const menuItemsWithCategory: MenuItemWithCategoryRaw[] = await this.prisma.menuItem.findMany({
      where: categoryId
        ? {
          categoryId: categoryId,
        }
        : {},
      include: {
        category: true,
      },
      orderBy: {
        name: 'asc',
      },
    });

    return menuItemsWithCategory.map(MenuDtoMapper.mapToDto);
  }
}
