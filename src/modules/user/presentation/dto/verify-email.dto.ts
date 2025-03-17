import { Field, InputType } from '@nestjs/graphql';
import { IsString } from 'class-validator';
import { IVerifyEmailInput } from 'src/modules/merchant/application/dto/verify-email.dto';

@InputType()
export class VerifyEmailInput implements IVerifyEmailInput {
  @Field(() => String, { description: '인증 코드' })
  @IsString()
  code: string;
}
