import { Inject, Injectable } from '@nestjs/common';
import { UserRepository } from '../../application/user.repository';
import { UserErrorService } from '../error/user-error.service';
import { IFindProfileInput } from '../../application/dto/find-profile.dto';
import { User } from '../entity/user.entity';

@Injectable()
export class FindProfileUsecase {
  constructor(
    @Inject('UserRepository')
    private readonly repository: UserRepository,
    private readonly errorService: UserErrorService,
  ) {}

  async execute(input: IFindProfileInput): Promise<User> {
    const user = await this.repository.findById(input.userId);
    if (!user) {
      throw this.errorService.get('USER_NOT_FOUND');
    }
    return user;
  }
}
