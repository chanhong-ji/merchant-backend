import { Inject, Injectable } from '@nestjs/common';
import { UserRepository } from '../../application/user.repository';
import { IFindUserInput } from '../../application/dto/find-user.dto';
import { User } from '../entity/user.entity';
import { ErrorService } from 'src/common/error/error.service';

@Injectable()
export class FindUserUsercase {
  constructor(
    @Inject('UserRepository')
    private readonly repository: UserRepository,
    private readonly errorService: ErrorService,
  ) {}

  async execute(input: IFindUserInput): Promise<User> {
    const user = await this.repository.findById(input.userId);
    if (!user) {
      throw this.errorService.get('USER_NOT_FOUND');
    }
    return user;
  }
}
