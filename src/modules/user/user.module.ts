import { Module } from '@nestjs/common';
import { UserResolver } from './user.resolver';
import { UserFactory } from './domain/user.factory';
import { TypeormUserRepository } from './infrastructure/typeorm/typeorm-user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModel } from './infrastructure/typeorm/user.model';
import { CreateAccountUsecase } from './domain/usecase/create-account.usecase';
import { UserErrorService } from './domain/error/user-error.service';
import { FindProfileUsecase } from './domain/usecase/find-profile.usecase';
import { EditProfileUsecase } from './domain/usecase/edit-profile.usecase';

@Module({
  imports: [TypeOrmModule.forFeature([UserModel])],
  providers: [
    UserResolver,
    UserFactory,
    UserErrorService,
    { provide: 'UserRepository', useClass: TypeormUserRepository },
    /** Usecases */
    CreateAccountUsecase,
    FindProfileUsecase,
    EditProfileUsecase,
  ],
  exports: ['UserRepository', UserErrorService],
})
export class UserModule {}
