import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { IProductOption } from '../../../domain/interface/product-option.interface';
import { IsInt, IsString } from 'class-validator';

@InputType({ isAbstract: true })
@ObjectType('AbstractOptionDto')
export class ProductOptionDto implements IProductOption {
  @Field(() => String, { description: '옵션 이름' })
  @IsString()
  name: string;

  @Field(() => Int, { description: '옵션 가격' })
  @IsInt()
  extra: number;

  @Field(() => [String], { nullable: true, description: '옵션 선택지' })
  choices?: string[];
}
