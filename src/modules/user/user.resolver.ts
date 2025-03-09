import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { UserFactory } from './domain/user.factory';
import { AuthUser } from '../auth/decorator/auth-user.decorator';
import { User } from './domain/user.entity';
import {
  CreateAccountInput,
  CreateAccountOutput,
} from './presentation/dto/create-account.dto';
import { Public } from '../auth/decorator/public.decorator';
import {
  FindProfileInput,
  FindProfileOutput,
} from './presentation/dto/find-profile.dto';
import {
  EditProfileInput,
  EditProfileOutput,
} from './presentation/dto/edit-profile.dto';

@Resolver()
export class UserResolver {
  constructor(private readonly factory: UserFactory) {}

  @Public()
  @Mutation(() => CreateAccountOutput)
  async createAccount(
    @Args('createAccountInput') input: CreateAccountInput,
  ): Promise<CreateAccountOutput> {
    const user = await this.factory.createAccount(input);
    return {
      ok: true,
      userId: user.id,
    };
  }

  @Query(() => FindProfileOutput)
  async findProfile(
    @Args('findProfileInput') input: FindProfileInput,
  ): Promise<FindProfileOutput> {
    const user = await this.factory.findProfile(input);
    return { ok: true, user };
  }

  @Mutation(() => EditProfileOutput)
  async editProfile(
    @Args('editProfileInput') input: EditProfileInput,
    @AuthUser() authUser: User,
  ): Promise<EditProfileOutput> {
    const user = await this.factory.editProfile(input, authUser);
    return { ok: true, user };
  }
}
