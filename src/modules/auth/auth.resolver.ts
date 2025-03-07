import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { LoginInput, LoginOutput } from './presentation/dto/login.dto';
import { AuthFactory } from './domain/auth.factory';

@Resolver()
export class AuthResolver {
  constructor(private readonly factory: AuthFactory) {}

  @Mutation(() => LoginOutput)
  async login(@Args('LoginInput') input: LoginInput) {
    const token = await this.factory.login(input);
    return {
      ok: true,
      token,
    };
  }
}
