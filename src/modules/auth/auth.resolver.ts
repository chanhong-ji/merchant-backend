import { LoginInput, LoginOutput } from './presentation/dto/login.dto';
import { AuthFactory } from './domain/auth.factory';
import { Public } from './decorator/public.decorator';

@Resolver()
export class AuthResolver {
  constructor(private readonly factory: AuthFactory) {}

  @Public()
  @Mutation(() => LoginOutput)
  async login(@Args('LoginInput') input: LoginInput) {
    const token = await this.factory.login(input);
    return {
      ok: true,
      token,
    };
  }
}
