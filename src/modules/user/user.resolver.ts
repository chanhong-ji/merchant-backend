import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UserFactory } from './domain/user.factory';
import {
  CreateAccountInput,
  CreateAccountOutput,
} from './presentation/dto/create-account.dto';
import { Public } from '../auth/decorator/public.decorator';

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
}
