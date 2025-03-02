import { Test, TestingModule } from '@nestjs/testing';
import { OrderService } from './order.service';
import { OrderRepository } from './order.repository';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderDto } from './dto/order.dto';

describe('OrderService', () => {
  let service: OrderService;
  let repository: OrderRepository;

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

  const mockOrderDto: OrderDto = {
    id: 1,
    total: 12.34,
    createdAt: new Date('2025-01-01'),
  };

  const mockOrderRepository = {
    create: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrderService,
        {
          provide: OrderRepository,
          useValue: mockOrderRepository,
        },
      ],
    }).compile();

    service = module.get<OrderService>(OrderService);
    repository = module.get<OrderRepository>(OrderRepository);

    // Reset mock calls between tests
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create order and return the result', async () => {
      // Arrange
      mockOrderRepository.create.mockResolvedValueOnce(mockOrderDto);

      // Act
      const result = await service.create(mockCreateOrderDto);

      // Assert
      expect(result).toEqual(mockOrderDto);

      expect(mockOrderRepository.create).toHaveBeenCalledWith(mockCreateOrderDto);
      expect(mockOrderRepository.create).toHaveBeenCalledTimes(1);
    });
  });
}); 