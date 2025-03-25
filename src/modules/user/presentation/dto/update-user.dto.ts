import { Field, InputType, ObjectType, OmitType } from '@nestjs/graphql';
import { IUpdateUserInput } from '../../application/dto/update-user.dto';
import { BaseOutput } from 'src/modules/shared/presentation/dto/base.dto';
import { UserDto } from './abstract/user.dto';
import { IsEmail, IsOptional, IsString } from 'class-validator';
import { User } from '../../domain/entity/user.entity';

@InputType()
export class UpdateUserInput implements IUpdateUserInput {
  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsEmail()
  email?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  password?: string;
}

@ObjectType()
export class UpdateUser extends OmitType(UserDto, ['password'], ObjectType) {}

@ObjectType()
export class UpdateUserOutput extends BaseOutput {
  @Field(() => UpdateUser, { nullable: true })
  user?: User;
}
