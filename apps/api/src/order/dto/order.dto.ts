import { ApiProperty } from '@nestjs/swagger';

/**
 * DTO for the order entity responses
 */
export class OrderDto {
  @ApiProperty({
    description: 'Unique identifier for the order',
    example: 1
  })
  id: number;

  @ApiProperty({
    description: 'Total value of the order in dolars',
    example: 15.00
  })
  total: number;

  @ApiProperty({
    description: 'Timestamp when the order was created',
    example: '2024-03-02T12:00:00Z'
  })
  createdAt: Date;
}


