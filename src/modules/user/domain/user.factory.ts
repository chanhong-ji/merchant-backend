import { Injectable } from '@nestjs/common';
import { CreateAccountUsecase } from './usecase/create-account.usecase';
import { ICreateAccountInput } from '../application/dto/create-account.dto';
import { User } from './user.entity';
import { IFindProfileInput } from '../application/dto/find-profile.dto';
import { FindProfileUsecase } from './usecase/find-profile.usecase';

@Injectable()
export class UserFactory {
  constructor(
    private readonly createAccountUsecase: CreateAccountUsecase,
    private readonly findProfileUsecase: FindProfileUsecase,
  ) {}

  createAccount(input: ICreateAccountInput): Promise<User> {
    return this.createAccountUsecase.execute(input);
  }

  findProfile(input: IFindProfileInput): Promise<User> {
    return this.findProfileUsecase.execute(input);
  }
}
