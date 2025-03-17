import { UserRepository } from '../../application/user.repository';
import { Inject, Injectable } from '@nestjs/common';
import { UserErrorService } from '../error/user-error.service';
import { IVerifyEmailInput } from 'src/modules/merchant/application/dto/verify-email.dto';
import { User } from '../entity/user.entity';

@Injectable()
export class VerifyEmailUsecase {
  constructor(
    @Inject('UserRepository') private readonly repository: UserRepository,
    private readonly errorService: UserErrorService,
  ) {}
  async execute({ code }: IVerifyEmailInput, currUser: User): Promise<void> {
    const user = await this.repository.findByIdWithVerification(currUser.id);
    if (!user) {
      throw new Error(this.errorService.get('USER_NOT_FOUND'));
    }

    if (user.verification?.code !== code) {
      throw new Error(this.errorService.get('VERIFICATION_CODE_WRONG'));
    }

    user.verified = true;
    await this.repository.save(user);
    await this.repository.deleteVerification(user.verification.id);
  }
}
