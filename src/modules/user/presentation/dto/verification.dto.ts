import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IVerification } from '../../domain/interface/verification.interface';
import { IsString } from 'class-validator';
import { UserDto } from './user.dto';

@ObjectType()
@InputType({ isAbstract: true })
export class VerificationDto implements IVerification {
  @Field(() => Number, { description: '아이디' })
  id: number;

  @Field(() => UserDto, { description: '유저' })
  user: UserDto;

  @Field(() => String, { description: '인증 코드' })
  @IsString()
  code: string;

  @Field(() => Date, { description: '생성일' })
  createdAt: Date;

  @Field(() => Date, { description: '수정일' })
  updatedAt: Date;
}
