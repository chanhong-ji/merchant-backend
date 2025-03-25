import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { IOption } from '../../domain/interface/item.interface';

@InputType({ isAbstract: true })
@ObjectType()
export class OptionDto implements IOption {
  @Field((type) => String)
  name: string;

  @Field((type) => Int)
  extra: number;

  @Field((type) => [String], { nullable: true })
  choices?: string[];
}
