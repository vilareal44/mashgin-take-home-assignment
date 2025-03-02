import { Test, TestingModule } from '@nestjs/testing';
import { MenuItemRepository } from './menu.repository';
import { PrismaService } from '../core/prisma.service';
import { NotFoundException } from '@nestjs/common';
import { MenuDto } from './dto/menu.dto';
import { MenuItem, MenuCategory } from '@prisma/client';

describe('MenuItemRepository', () => {
  let repository: MenuItemRepository;
  let prismaService: PrismaService;

  const mockCategory: MenuCategory = {
    id: 1,
    name: 'Test Category',
    imageId: 'test-category-image-id',
  };

  const mockMenuItem: MenuItem = {
    id: 1,
    name: 'Test Item',
    price: 9.99,
    imageId: 'test-image-id',
    categoryId: 1,
  };

  const mockMenuItemWithCategory = {
    ...mockMenuItem,
    category: mockCategory,
  };

  const mockPrismaService = {
    menuCategory: {
      findUnique: jest.fn(),
    },
    menuItem: {
      findMany: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MenuItemRepository,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    repository = module.get<MenuItemRepository>(MenuItemRepository);
    prismaService = module.get<PrismaService>(PrismaService);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });

  describe('getMenu', () => {
    it('should return all menu items when no categoryId is provided', async () => {
      // Arrange
      mockPrismaService.menuItem.findMany.mockResolvedValueOnce([mockMenuItemWithCategory]);

      // Act
      const result = await repository.getMenu();

      // Assert
      expect(mockPrismaService.menuCategory.findUnique).not.toHaveBeenCalled();

      expect(result).toHaveLength(1);
      expect(result[0].id).toEqual(mockMenuItem.id);
      expect(result[0].name).toEqual(mockMenuItem.name);
      expect(result[0].price).toEqual(mockMenuItem.price);
      expect(result[0].imageId).toEqual(mockMenuItem.imageId);
      expect(result[0].category).toBeDefined();
      expect(result[0].category.id).toEqual(mockCategory.id);
      expect(result[0].category.name).toEqual(mockCategory.name);
      expect(result[0].category.imageId).toEqual(mockCategory.imageId);

      expect(mockPrismaService.menuItem.findMany).toHaveBeenCalledWith({
        where: {},
        include: {
          category: true,
        },
        orderBy: {
          name: 'asc',
        },
      });
    });

    it('should return filtered menu items when categoryId is provided and category exists', async () => {
      // Arrange
      const categoryId = 1;
      mockPrismaService.menuCategory.findUnique.mockResolvedValueOnce(mockCategory);
      mockPrismaService.menuItem.findMany.mockResolvedValueOnce([mockMenuItemWithCategory]);

      // Act
      const result = await repository.getMenu(categoryId);

      // Assert
      expect(result).toHaveLength(1);
      expect(result[0].id).toEqual(mockMenuItem.id);
      expect(result[0].category.id).toEqual(categoryId);

      expect(mockPrismaService.menuCategory.findUnique).toHaveBeenCalledWith({
        where: {
          id: categoryId,
        },
      });

      expect(mockPrismaService.menuItem.findMany).toHaveBeenCalledWith({
        where: {
          categoryId: categoryId,
        },
        include: {
          category: true,
        },
        orderBy: {
          name: 'asc',
        },
      });
    });

    it('should throw NotFoundException when categoryId is provided but category doesnt exist', async () => {
      // Arrange
      const categoryId = 1;
      mockPrismaService.menuCategory.findUnique.mockResolvedValueOnce(null);

      // Act and Assert
      await expect(repository.getMenu(categoryId)).rejects.toThrow(NotFoundException);
      expect(mockPrismaService.menuCategory.findUnique).toHaveBeenCalledWith({
        where: {
          id: categoryId,
        },
      });
      expect(mockPrismaService.menuItem.findMany).not.toHaveBeenCalled();
    });
  });
}); 