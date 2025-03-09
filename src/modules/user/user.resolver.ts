import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { UserFactory } from './domain/user.factory';
import {
  CreateAccountInput,
  CreateAccountOutput,
} from './presentation/dto/create-account.dto';
import { Public } from '../auth/decorator/public.decorator';
import {
  FindProfileInput,
  FindProfileOutput,
} from './presentation/dto/find-profile.dto';

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
}
