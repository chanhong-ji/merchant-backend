import { Field, InputType, ObjectType } from '@nestjs/graphql';
import {
  IPaginationInput,
  IPaginationOutput,
} from '../../application/dto/pagination.dto';
import { BaseOutput } from '../output/base.output';

@InputType()
export class PaginationInput implements IPaginationInput {
  @Field(() => Number, { defaultValue: 1, description: '페이지 번호' })
  page: number;

  @Field(() => Number, { description: '페이지당 데이터 개수' })
  limit: number;
}

@ObjectType()
export class PaginationOutput extends BaseOutput implements IPaginationOutput {
  @Field(() => Number, { description: '총 데이터 개수' })
  total: number;
}
