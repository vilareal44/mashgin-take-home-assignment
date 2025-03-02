import { Test, TestingModule } from '@nestjs/testing';
import { OrderRepository } from './order.repository';
import { PrismaService } from '../core/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from '@prisma/client';

describe('OrderRepository', () => {
  let repository: OrderRepository;
  let prismaService: PrismaService;

  const mockCreateOrderDto: CreateOrderDto = {
    name: 'Test User',
    creditCardNumber: '1234',
    expirationDate: '01/01',
    cvc: '123',
    address: 'Mashgin St',
    total: 12.34,
    items: [
      {
        id: 1,
        quantity: 2,
      },
      {
        id: 2,
        quantity: 4,
      },
    ],
  };

  const mockOrder: Order = {
    id: 1,
    total: 12.34,
    createdAt: new Date('2025-01-01'),
  };

  const mockPrismaService = {
    order: {
      create: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrderRepository,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    repository = module.get<OrderRepository>(OrderRepository);
    prismaService = module.get<PrismaService>(PrismaService);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });

  describe('create', () => {
    it('should create order with payment and items', async () => {
      // Arrange
      mockPrismaService.order.create.mockResolvedValueOnce(mockOrder);

      // Act
      const result = await repository.create(mockCreateOrderDto);

      // Assert
      expect(result).toBeDefined();

      expect(result.id).toEqual(mockOrder.id);
      expect(result.total).toEqual(mockOrder.total);
      expect(result.createdAt).toEqual(mockOrder.createdAt);

      expect(mockPrismaService.order.create).toHaveBeenCalledWith({
        data: {
          total: mockCreateOrderDto.total,
          items: {
            createMany: {
              data: mockCreateOrderDto.items.map((item) => ({
                itemId: item.id,
                quantity: item.quantity,
              })),
            },
          },
          payment: {
            create: {
              name: mockCreateOrderDto.name,
              amount: mockCreateOrderDto.total,
              creditCardNumber: mockCreateOrderDto.creditCardNumber,
              expirationDate: expect.any(Date),
              cvc: parseInt(mockCreateOrderDto.cvc),
              address: mockCreateOrderDto.address,
            },
          },
        },
      });
    });
  });
}); 