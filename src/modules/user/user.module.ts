import { Module } from '@nestjs/common';
import { UserResolver } from './user.resolver';
import { UserFactory } from './domain/user.factory';
import { TypeormUserRepository } from './infrastructure/typeorm/typeorm-user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModel } from './infrastructure/typeorm/user.model';

@Module({
  imports: [TypeOrmModule.forFeature([UserModel])],
  providers: [UserResolver, UserFactory, TypeormUserRepository],
})
export class UserModule {}
