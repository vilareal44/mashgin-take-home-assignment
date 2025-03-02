import { Injectable } from '@nestjs/common';
import { PrismaService } from '../core/prisma.service';
import { MenuItem, MenuCategory } from '@prisma/client';
import { MenuDto } from './dto/menu.dto';
import { MenuItemRepository } from './menu.repository';

/**
 * Service for managing menu items. Right now it is a simple service that only retrieves data from repository
 * Business logic should be implemented here in the future
 */
@Injectable()
export class MenuService {
  constructor(private readonly menuItemRepository: MenuItemRepository) {}

  /**
   * Retrieves menu items from the database based on the provided category ID.
   * @param {number?} categoryId - optional - The ID of the category to filter the menu items by.
   * @returns {Promise<MenuDto[]>} A promise resolving to an array of MenuDto.
   */
  async getMenu(categoryId?: number): Promise<MenuDto[]> {
    return this.menuItemRepository.getMenu(categoryId);
  }
}
