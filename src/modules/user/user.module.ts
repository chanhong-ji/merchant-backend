import { Module } from '@nestjs/common';
import { UserResolver } from './user.resolver';
import { UserFactory } from './domain/user.factory';
import { CreateAccountUsecase } from './domain/usecase/create-account.usecase';
import { FindProfileUsecase } from './domain/usecase/find-profile.usecase';
import { EditProfileUsecase } from './domain/usecase/edit-profile.usecase';
import { VerifyEmailUsecase } from './domain/usecase/verify-email.usecase';
import { UserSubscriber } from 'src/infrastructure/typeorm/subscriber/user.subscriber';
import { RepositoryModule } from 'src/infrastructure/typeorm/repository.module';

@Module({
  imports: [RepositoryModule],
  providers: [
    UserResolver,
    UserFactory,
    /** Usecases */
    CreateAccountUsecase,
    FindProfileUsecase,
    EditProfileUsecase,
    VerifyEmailUsecase,
  ],
})
export class UserModule {}
