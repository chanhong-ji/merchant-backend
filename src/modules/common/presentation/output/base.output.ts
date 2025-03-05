import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class BaseOutput {
  @Field(() => Boolean)
  ok: boolean;
}
