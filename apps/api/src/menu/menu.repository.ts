import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../core/prisma.service';
import { MenuItem, MenuCategory } from '@prisma/client';
import { MenuDto } from './dto/menu.dto';

type MenuItemWithCategoryRaw = MenuItem & {
  category: MenuCategory;
};

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

    return menuItemsWithCategory.map(this.mapToDto);
  }

  // mapper to convert the raw db data to the DTO
  private mapToDto(menuItemWithCategory: MenuItemWithCategoryRaw): MenuDto {
    const { id, name, imageId, price, category } = menuItemWithCategory;
    const { id: categoryId, name: categoryName, imageId: categoryImageId } = category;

    return {
      id,
      name,
      imageId,
      price,
      category: {
        id: categoryId,
        name: categoryName,
        imageId: categoryImageId,
      },
    } as MenuDto;
  }
}
