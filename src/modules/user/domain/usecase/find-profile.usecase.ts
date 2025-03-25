import { Inject, Injectable } from '@nestjs/common';
import { UserRepository } from '../../application/user.repository';
import { IFindProfileInput } from '../../application/dto/find-profile.dto';
import { User } from '../entity/user.entity';
import { ErrorService } from 'src/common/error/error.service';

@Injectable()
export class FindProfileUsecase {
  constructor(
    @Inject('UserRepository')
    private readonly repository: UserRepository,
    private readonly errorService: ErrorService,
  ) {}

  async execute(input: IFindProfileInput): Promise<User> {
    const user = await this.repository.findById(input.userId);
    if (!user) {
      throw this.errorService.get('USER_NOT_FOUND');
    }
    return user;
  }
}
