import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from './prisma.service';

describe('PrismaService', () => {
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrismaService],
    }).compile();

    prismaService = module.get<PrismaService>(PrismaService);

    prismaService.$connect = jest.fn(); // mock $connect
  });

  it('should be defined', () => {
    expect(prismaService).toBeDefined();
  });

  describe('onModuleInit', () => {
    it('should connect to db on module init', async () => {
      await prismaService.onModuleInit();

      expect(prismaService.$connect).toHaveBeenCalledTimes(1);
    });
  });
}); 