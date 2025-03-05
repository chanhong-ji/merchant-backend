import { Injectable } from '@nestjs/common';
import { CreateAccountUsecase } from './usecase/create-account.usecase';
import { ICreateAccountInput } from '../application/dto/create-account.dto';
import { User } from './user.entity';

@Injectable()
export class UserFactory {
  constructor(private readonly createAccountUsecase: CreateAccountUsecase) {}

  createAccount(input: ICreateAccountInput): Promise<User> {
    return this.createAccountUsecase.execute(input);
  }
}
