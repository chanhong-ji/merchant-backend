import { Module } from '@nestjs/common';
import { UserResolver } from './user.resolver';
import { UserFactory } from './domain/user.factory';
import { TypeormUserRepository } from '../../infrastructure/user/repository-impl/typeorm-user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModel } from '../../infrastructure/user/model/user.model';
import { CreateAccountUsecase } from './domain/usecase/create-account.usecase';
import { UserErrorService } from './domain/error/user-error.service';
import { FindProfileUsecase } from './domain/usecase/find-profile.usecase';
import { EditProfileUsecase } from './domain/usecase/edit-profile.usecase';
import { VerificationModel } from '../../infrastructure/user/model/verification.model';
import { VerifyEmailUsecase } from './domain/usecase/verify-email.usecase';
import { UserSubscriber } from '../../infrastructure/user/repository-impl/user.subscriber';

@Module({
  imports: [TypeOrmModule.forFeature([UserModel, VerificationModel])],
  providers: [
    UserResolver,
    UserFactory,
    UserErrorService,
    { provide: 'UserRepository', useClass: TypeormUserRepository },
    UserSubscriber,
    /** Usecases */
    CreateAccountUsecase,
    FindProfileUsecase,
    EditProfileUsecase,
    VerifyEmailUsecase,
  ],
  exports: ['UserRepository', UserErrorService],
})
export class UserModule {}
