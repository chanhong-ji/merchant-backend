import { Inject, Injectable } from '@nestjs/common';
import { UserRepository } from '../../application/user.repository';
import { ICreateAccountInput } from '../../application/dto/create-account.dto';
import { User } from '../entity/user.entity';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { Verification } from '../entity/verification.entity';
import { ErrorService } from 'src/common/error/error.service';
import { CustomGraphQLError } from 'src/common/error/custom-graphql-error';

@Injectable()
export class CreateAccountUsecase {
  constructor(
    @Inject('UserRepository')
    private readonly repository: UserRepository,
    private readonly errorService: ErrorService,
    private readonly configService: ConfigService,
  ) {}

  async execute(input: ICreateAccountInput): Promise<User> {
    await this.validateEmailDuplicate(input);
    return this.createUser(input);
  }

  async validateEmailDuplicate(input: ICreateAccountInput) {
    const existingUser = await this.repository.findByEmail(input.email);
    if (existingUser) {
      throw new CustomGraphQLError(
        this.errorService.get('EMAIL_ALREADY_EXIST'),
        {
          level: 'log',
        },
      );
    }
  }

  async createUser(input: ICreateAccountInput) {
    const user = User.create(input);
    user.password = await this.createHashedPassword(user.password);
    user.verification = Verification.create(user);
    return this.repository.save(user);
  }

  createHashedPassword(password: string): Promise<string> {
    return bcrypt.hash(
      password,
      this.configService.get<number>('auth.bcrypt.salt') ?? 10,
    );
  }
}
