import { ApiProperty } from '@nestjs/swagger';

/**
 * DTO for menu category
 */
export class MenuCategoryDto {
  @ApiProperty({
    description: 'Unique identifier for the category',
    example: 1
  })
  id: number;

  @ApiProperty({
    description: 'Name of the category',
    example: 'Bakery'
  })
  name: string;

  @ApiProperty({
    description: 'Image identifier for category',
    example: 'f3fbf57b118fa9'
  })
  imageId: string;
}
