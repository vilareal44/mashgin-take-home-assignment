import { ApiProperty } from '@nestjs/swagger';
import { MenuCategoryDto } from './menu-category.dto';

/**
 * DTO for menu item
 */
export class MenuDto {
  @ApiProperty({
    description: 'Unique identifier for the menu item',
    example: 1
  })
  id: number;

  @ApiProperty({
    description: 'Name of the menu item',
    example: 'Bagel'
  })
  name: string;

  @ApiProperty({
    description: 'Image identifier for the menu item',
    example: '293202f9d9f7f4'
  })
  imageId: string;

  @ApiProperty({
    description: 'Price of the menu item in cents',
    example: 2.00
  })
  price: number;

  @ApiProperty({
    description: 'Category information',
    type: MenuCategoryDto
  })
  category: MenuCategoryDto;
}
