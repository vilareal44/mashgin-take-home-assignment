import { MenuItem, MenuCategory } from '@prisma/client';
import { MenuDto } from '../menu.dto';

/**
 * Type definition for a menu item with its category
 */
export type MenuItemWithCategoryRaw = MenuItem & {
  category: MenuCategory;
};

/**
 * Mapper for converting MenuItemWithCategoryRaw to MenuDto
 */
export class MenuDtoMapper {
  /**
   * Maps a raw menu item with category to a MenuDto
   * @param {MenuItemWithCategoryRaw} menuItemWithCategory - The menu item with category data from the database
   * @returns {MenuDto} The mapped MenuDto
   */
  public static mapToDto(menuItemWithCategory: MenuItemWithCategoryRaw): MenuDto {
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