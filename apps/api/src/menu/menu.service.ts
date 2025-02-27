import { Injectable } from '@nestjs/common';
import { PrismaService } from '../shared/prisma.service';

/**
 * Service for managing menu items 
 * Currently only used for the menu page, and will only retrieve items based on the categoryId
 */
@Injectable()
export class MenuService {
  constructor(private readonly prisma: PrismaService) { }

  /**
   * Retrieves menu items based on the provided category ID
   * @param categoryId - The ID of the category to filter the menu items by
   * if no categoryId is provided, all menu items are returned
   * @returns A promise resolving to an array of menu items
   */
  async getMenu(categoryId?: number) {
    return this.prisma.menuItem.findMany({
      where: categoryId ? {
        categoryId: categoryId,
      } : {},
      include: {
        category: true,
      },
      orderBy: {
        name: 'asc',
      },
    });
  }
}
