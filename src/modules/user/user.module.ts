import { Module } from '@nestjs/common';
import { UserResolver } from './user.resolver';
import { UserFactory } from './domain/user.factory';
import { TypeormUserRepository } from './infrastructure/typeorm/typeorm-user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModel } from './infrastructure/typeorm/user.model';
import { CreateAccountUsecase } from './domain/usecase/create-account.usecase';

@Module({
  imports: [TypeOrmModule.forFeature([UserModel])],
  providers: [
    UserResolver,
    UserFactory,
    TypeormUserRepository,
    /** Usecases */
    CreateAccountUsecase,
  ],
})
export class UserModule {}
