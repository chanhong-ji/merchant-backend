import * as bcrypt from 'bcrypt';
import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ILoginInput } from '../../application/dto/login.dto';
import { UserRepository } from 'src/modules/user/application/user.repository';
import { User } from 'src/modules/user/domain/entity/user.entity';
import { ErrorService } from 'src/common/error/error.service';
import { CustomGraphQLError } from 'src/common/error/custom-graphql-error';

@Injectable()
export class LoginUsecase {
  constructor(
    @Inject('UserRepository')
    private readonly userRepository: UserRepository,
    private readonly errorService: ErrorService,
    private jwtService: JwtService,
  ) {}

  async execute(input: ILoginInput): Promise<string> {
    const user = await this.findUser(input);
    await this.checkPassword(input, user);
    const token = await this.generateToken(user);
    return token;
  }

  async findUser(input: ILoginInput): Promise<User> {
    const user = await this.userRepository.findByEmail(input.email);
    if (user == null) {
      throw new CustomGraphQLError(this.errorService.get('USER_NOT_FOUND'), {
        level: 'log',
      });
    }
    return user;
  }

  async checkPassword(input: ILoginInput, user: User): Promise<void> {
    const isMatch = await bcrypt.compare(input.password, user.password);
    if (!isMatch) {
      throw new CustomGraphQLError(this.errorService.get('PASSWORD_WRONG'), {
        level: 'log',
      });
    }
  }

  async generateToken(user: User): Promise<string> {
    const payload = { userId: user.id };
    const token = await this.jwtService.signAsync(payload);
    return token;
  }
}
