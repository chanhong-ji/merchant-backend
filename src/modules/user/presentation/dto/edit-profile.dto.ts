import { Field, InputType, ObjectType, OmitType } from '@nestjs/graphql';
import { IEditProfileInput } from '../../application/dto/edit-profile.dto';
import { BaseOutput } from 'src/modules/shared/presentation/dto/base.dto';
import { UserDto } from './abstract/user.dto';
import { IsEmail, IsOptional, IsString } from 'class-validator';
import { User } from '../../domain/entity/user.entity';

@InputType()
export class EditProfileInput implements IEditProfileInput {
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
export class EditUser extends OmitType(UserDto, ['password'], ObjectType) {}

@ObjectType()
export class EditProfileOutput extends BaseOutput {
  @Field(() => EditUser, { nullable: true })
  user?: User;
}
