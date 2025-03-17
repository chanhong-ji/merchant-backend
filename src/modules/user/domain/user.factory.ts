import { Injectable } from '@nestjs/common';
import { CreateAccountUsecase } from './usecase/create-account.usecase';
import { ICreateAccountInput } from '../application/dto/create-account.dto';
import { User } from './entity/user.entity';
import { IFindProfileInput } from '../application/dto/find-profile.dto';
import { FindProfileUsecase } from './usecase/find-profile.usecase';
import { EditProfileUsecase } from './usecase/edit-profile.usecase';
import { IEditProfileInput } from '../application/dto/edit-profile.dto';
import { VerifyEmailUsecase } from './usecase/verify-email.usecase';
import { IVerifyEmailInput } from 'src/modules/merchant/application/dto/verify-email.dto';

@Injectable()
export class UserFactory {
  constructor(
    private readonly createAccountUsecase: CreateAccountUsecase,
    private readonly findProfileUsecase: FindProfileUsecase,
    private readonly editProfileUsecase: EditProfileUsecase,
    private readonly verifyEmailUsecase: VerifyEmailUsecase,
  ) {}

  createAccount(input: ICreateAccountInput): Promise<User> {
    return this.createAccountUsecase.execute(input);
  }

  findProfile(input: IFindProfileInput): Promise<User> {
    return this.findProfileUsecase.execute(input);
  }

  editProfile(input: IEditProfileInput, user: User): Promise<User> {
    return this.editProfileUsecase.execute(input, user);
  }

  verifyEmail(input: IVerifyEmailInput, user: User): Promise<void> {
    return this.verifyEmailUsecase.execute(input, user);
  }
}
