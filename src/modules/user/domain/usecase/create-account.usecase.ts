import { Inject, Injectable } from '@nestjs/common';
import { TypeormUserRepository } from '../../infrastructure/typeorm/typeorm-user.repository';
import { UserRepository } from '../../application/user.repository';
import { ICreateAccountInput } from '../../application/dto/create-account.dto';
import { User } from '../user.entity';

@Injectable()
export class CreateAccountUsecase {
  constructor(
    @Inject(TypeormUserRepository)
    private readonly repository: UserRepository,
  ) {}

  async execute(input: ICreateAccountInput): Promise<User> {
    const user = User.create(input);
    return this.repository.save(user);
  }
}
