import { UserRepository } from '../../application/user.repository';
import { Inject, Injectable } from '@nestjs/common';
import { IVerifyEmailInput } from 'src/modules/merchant/application/dto/verify-email.dto';
import { User } from '../entity/user.entity';
import { ErrorService } from 'src/common/error/error.service';
import { CustomGraphQLError } from 'src/common/error/custom-graphql-error';

@Injectable()
export class VerifyEmailUsecase {
  constructor(
    @Inject('UserRepository') private readonly repository: UserRepository,
    private readonly errorService: ErrorService,
  ) {}
  async execute({ code }: IVerifyEmailInput, currUser: User): Promise<void> {
    const user = await this.repository.findByIdWithVerification(currUser.id);
    if (!user) {
      throw new CustomGraphQLError(this.errorService.get('USER_NOT_FOUND'), {
        level: 'log',
      });
    }

    if (user.verification?.code !== code) {
      throw new CustomGraphQLError(
        this.errorService.get('VERIFICATION_CODE_WRONG'),
        {
          level: 'log',
        },
      );
    }

    user.verified = true;
    await this.repository.save(user);
    await this.repository.deleteVerification(user.verification.id);
  }
}
