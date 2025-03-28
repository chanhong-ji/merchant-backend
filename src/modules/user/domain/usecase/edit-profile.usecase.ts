import { Inject, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserRepository } from '../../application/user.repository';
import { UserErrorService } from '../error/user-error.service';
import { User } from '../entity/user.entity';
import { IEditProfileInput } from '../../application/dto/edit-profile.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EditProfileUsecase {
  constructor(
    @Inject('UserRepository') private readonly repository: UserRepository,
    private readonly errorService: UserErrorService,
    private readonly configService: ConfigService,
  ) {}

  async execute(input: IEditProfileInput, currUser: User): Promise<User> {
    const user = await this.findUser(currUser);
    return await this.editUser(input, user);
  }

  async findUser(currUser: User) {
    const user = await this.repository.findById(currUser.id);
    if (!user) {
      throw new Error(this.errorService.get('USER_NOT_FOUND'));
    }
    return user;
  }

  async editUser(input: IEditProfileInput, user: User): Promise<User> {
    if (input.email) {
      user.email = input.email;
    }

    if (input.password) {
      user.password = await this.createHashedPassword(input.password);
    }

    return this.repository.save(user);
  }

  createHashedPassword(password: string): Promise<string> {
    return bcrypt.hash(
      password,
      this.configService.get<number>('auth.bcrypt.salt') ?? 10,
    );
  }
}
