import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IUpdateUserInput } from '../../application/dto/update-user.dto';
import { BaseOutput } from 'src/modules/shared/presentation/dto/base.dto';
import { IsEmail, IsOptional, IsString } from 'class-validator';
import { User } from '../../domain/entity/user.entity';
import { DetailUserDto } from './detail-user.dto';

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
export class UpdateUserOutput extends BaseOutput {
  @Field(() => DetailUserDto, { nullable: true })
  user?: User;
}
