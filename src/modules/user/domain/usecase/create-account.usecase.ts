import { Inject, Injectable } from '@nestjs/common';
import { UserRepository } from '../../application/user.repository';
import { ICreateAccountInput } from '../../application/dto/create-account.dto';
import { User } from '../entity/user.entity';
import { UserErrorService } from '../error/user-error.service';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CreateAccountUsecase {
  constructor(
    @Inject('UserRepository')
    private readonly repository: UserRepository,
    private readonly errorService: UserErrorService,
    private readonly configService: ConfigService,
  ) {}

  async execute(input: ICreateAccountInput): Promise<User> {
    await this.validateEmailDuplicate(input);
    return this.createUser(input);
  }

  async validateEmailDuplicate(input: ICreateAccountInput) {
    const existingUser = await this.repository.findByEmail(input.email);
    if (existingUser) {
      throw new Error(this.errorService.get('EMAIL_ALREADY_EXIST'));
    }
  }

  async createUser(input: ICreateAccountInput) {
    const user = User.create(input);
    user.password = await this.createHashedPassword(user.password);
    return this.repository.save(user);
  }

  createHashedPassword(password: string): Promise<string> {
    return bcrypt.hash(
      password,
      this.configService.get<number>('auth.bcrypt.salt') ?? 10,
    );
  }
}
