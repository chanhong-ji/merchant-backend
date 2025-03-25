import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { IOption } from '../../domain/interface/item.interface';
import { IsInt, IsString } from 'class-validator';

@InputType({ isAbstract: true })
@ObjectType('AbstractOptionDto')
export class OptionDto implements IOption {
  @Field(() => String)
  @IsString()
  name: string;

  @Field(() => Int)
  @IsInt()
  extra: number;

  @Field(() => [String], { nullable: true })
  choices?: string[];
}
