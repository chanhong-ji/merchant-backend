import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { IFindUserInput, IFindUserOutput } from '../../application/dto/find-user.dto';
import { IsInt } from 'class-validator';
import { BaseOutput } from 'src/modules/shared/presentation/dto/base.dto';
import { SimpleUserDto } from './simple-user.dto';
import { User } from '../../domain/entity/user.entity';

@InputType()
export class FindUserInput implements IFindUserInput {
  @Field(() => Int, { description: '유저 아이디' })
  @IsInt()
  userId: number;
}

@ObjectType()
export class FindUserOutput extends BaseOutput implements IFindUserOutput {
  @Field(() => SimpleUserDto, { nullable: true })
  user?: User;
}
