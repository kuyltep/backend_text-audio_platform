import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { ProductEntity } from 'src/product/entities/product.entity';
import { UserEntity } from 'src/users/entities/user.entity';

export class DeleteCommentDto {
  @ApiProperty({ default: '1' })
  @IsNotEmpty()
  product: ProductEntity;
}
