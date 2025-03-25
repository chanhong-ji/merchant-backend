import { Inject, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserRepository } from '../../application/user.repository';
import { User } from '../entity/user.entity';
import { IUpdateUserInput } from '../../application/dto/update-user.dto';
import { ConfigService } from '@nestjs/config';
import { ErrorService } from 'src/common/error/error.service';
import { CustomGraphQLError } from 'src/common/error/custom-graphql-error';

@Injectable()
export class UpdateUserUsecase {
  constructor(
    @Inject('UserRepository') private readonly repository: UserRepository,
    private readonly errorService: ErrorService,
    private readonly configService: ConfigService,
  ) {}

  async execute(input: IUpdateUserInput, currUser: User): Promise<User> {
    const user = await this.findUser(currUser);
    return await this.updateUser(input, user);
  }

  async findUser(currUser: User) {
    const user = await this.repository.findById(currUser.id);
    if (!user) {
      throw new CustomGraphQLError(this.errorService.get('USER_NOT_FOUND'), {
        level: 'log',
      });
    }
    return user;
  }

  async updateUser(input: IUpdateUserInput, user: User): Promise<User> {
    if (input.email) {
      user.email = input.email;
    }

    if (input.password) {
      user.password = await this.createHashedPassword(input.password);
    }

    return this.repository.save(user);
  }

  createHashedPassword(password: string): Promise<string> {
    return bcrypt.hash(password, this.configService.get<number>('auth.bcrypt.salt') ?? 10);
  }
}
