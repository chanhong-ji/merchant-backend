import { Module } from '@nestjs/common';
import { UserResolver } from './user.resolver';
import { UserFactory } from './domain/user.factory';
import { CreateUserUsecase } from './domain/usecase/create-account.usecase';
import { FindUserUsercase } from './domain/usecase/find-user.usecase';
import { UpdateUserUsecase } from './domain/usecase/update-user.usecase';
import { VerifyEmailUsecase } from './domain/usecase/verify-email.usecase';
import { UserSubscriber } from 'src/infrastructure/typeorm/subscriber/user.subscriber';
import { RepositoryModule } from 'src/infrastructure/typeorm/repository.module';

@Module({
  imports: [RepositoryModule],
  providers: [
    UserResolver,
    UserFactory,
    /** Usecases */
    CreateUserUsecase,
    FindUserUsercase,
    UpdateUserUsecase,
    VerifyEmailUsecase,
  ],
})
export class UserModule {}
