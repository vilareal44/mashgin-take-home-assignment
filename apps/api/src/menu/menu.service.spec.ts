import { Test, TestingModule } from '@nestjs/testing';
import { MenuService } from './menu.service';
import { MenuItemRepository } from './menu.repository';
import { MenuDto } from './dto/menu.dto';

describe('MenuService', () => {
  let service: MenuService;
  let repository: MenuItemRepository;

  const mockMenuDto: MenuDto[] = [
    {
      id: 1,
      name: 'Test Item',
      price: 9.99,
      imageId: 'test-image-id',
      category: {
        id: 1,
        name: 'Test Category',
        imageId: 'test-category-image-id',
      },
    },
  ];

  const mockMenuItemRepository = {
    getMenu: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MenuService,
        {
          provide: MenuItemRepository,
          useValue: mockMenuItemRepository,
        },
      ],
    }).compile();

    service = module.get<MenuService>(MenuService);
    repository = module.get<MenuItemRepository>(MenuItemRepository);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getMenu', () => {
    it('should return menu items when no categoryId is provided', async () => {
      // Arrange
      mockMenuItemRepository.getMenu.mockResolvedValueOnce(mockMenuDto);

      // Act
      const result = await service.getMenu();

      // Assert
      expect(result).toEqual(mockMenuDto);
      expect(mockMenuItemRepository.getMenu).toHaveBeenCalledWith(undefined);
      expect(mockMenuItemRepository.getMenu).toHaveBeenCalledTimes(1);
    });

    it('should return menu items when categoryId is provided', async () => {
      // Arrange
      const categoryId = 1;
      mockMenuItemRepository.getMenu.mockResolvedValueOnce(mockMenuDto);

      // Act
      const result = await service.getMenu(categoryId);

      // Assert
      expect(result).toEqual(mockMenuDto);
      expect(mockMenuItemRepository.getMenu).toHaveBeenCalledWith(categoryId);
      expect(mockMenuItemRepository.getMenu).toHaveBeenCalledTimes(1);
    });
  });
}); 