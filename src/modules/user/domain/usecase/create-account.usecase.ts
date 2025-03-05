import { Inject, Injectable } from '@nestjs/common';
import { TypeormUserRepository } from '../../infrastructure/typeorm/typeorm-user.repository';
import { UserRepository } from '../../application/user.repository';
import { ICreateAccountInput } from '../../application/dto/create-account.dto';
import { User } from '../user.entity';
import { UserErrorService } from '../error/user-error.service';

@Injectable()
export class CreateAccountUsecase {
  constructor(
    @Inject('UserRepository')
    private readonly repository: UserRepository,
    private readonly errorService: UserErrorService,
  ) {}

  async execute(input: ICreateAccountInput): Promise<User> {
    await this.validateEmailDuplicate(input);
    return this.createUser(input);
  }

  async validateEmailDuplicate(input: ICreateAccountInput) {
    const existingUser = await this.repository.findByEmail(input.email);
    if (existingUser) {
      throw new Error(this.errorService.get('EMAIL_ALREADY_EXIST'));
    }
  }

  createUser(input: ICreateAccountInput) {
    const user = User.create(input);
    return this.repository.save(user);
  }
}
