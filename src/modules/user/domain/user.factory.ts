import { Injectable } from '@nestjs/common';
import { CreateUserUsecase } from './usecase/create-account.usecase';
import { ICreateUserInput } from '../application/dto/create-account.dto';
import { User } from './entity/user.entity';
import { IFindUserInput } from '../application/dto/find-user.dto';
import { FindUserUsercase } from './usecase/find-user.usecase';
import { UpdateUserUsecase } from './usecase/update-user.usecase';
import { IUpdateUserInput } from '../application/dto/update-user.dto';
import { VerifyEmailUsecase } from './usecase/verify-email.usecase';
import { IVerifyEmailInput } from 'src/modules/merchant/application/dto/verify-email.dto';

@Injectable()
export class UserFactory {
  constructor(
    private readonly createUserUsecase: CreateUserUsecase,
    private readonly findUserUsecase: FindUserUsercase,
    private readonly updateUserUsecase: UpdateUserUsecase,
    private readonly verifyEmailUsecase: VerifyEmailUsecase,
  ) {}

  createUser(input: ICreateUserInput): Promise<User> {
    return this.createUserUsecase.execute(input);
  }

  findUser(input: IFindUserInput): Promise<User> {
    return this.findUserUsecase.execute(input);
  }

  updateUser(input: IUpdateUserInput, user: User): Promise<User> {
    return this.updateUserUsecase.execute(input, user);
  }

  verifyEmail(input: IVerifyEmailInput, user: User): Promise<void> {
    return this.verifyEmailUsecase.execute(input, user);
  }
}
