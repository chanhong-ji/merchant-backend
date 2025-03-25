import { Field, InputType, ObjectType } from '@nestjs/graphql';
import {
  IPaginationInput,
  IPaginationOutput,
} from '../../application/dto/pagination.dto';
import { BaseOutput } from './base.dto';
import { Max } from 'class-validator';

@InputType()
export class PaginationInput implements IPaginationInput {
  @Field(() => Number, { defaultValue: 1, description: '페이지 번호' })
  page: number;

  @Max(100)
  @Field(() => Number, {
    description: '페이지당 데이터 개수',
    defaultValue: 10,
  })
  limit: number;
}

@ObjectType()
export class PaginationOutput extends BaseOutput implements IPaginationOutput {
  @Field(() => Number, { description: '총 데이터 개수' })
  total: number;
}
