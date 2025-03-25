import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { IOption } from '../../../domain/interface/item.interface';
import { IsInt, IsString } from 'class-validator';

@InputType({ isAbstract: true })
@ObjectType('AbstractOptionDto')
export class OptionDto implements IOption {
  @Field(() => String, { description: '옵션 이름' })
  @IsString()
  name: string;

  @Field(() => Int, { description: '옵션 가격' })
  @IsInt()
  extra: number;

  @Field(() => [String], { nullable: true, description: '옵션 선택지' })
  choices?: string[];
}
