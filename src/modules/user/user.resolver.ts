import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { UserFactory } from './domain/user.factory';
import { AuthUser } from '../auth/decorator/auth-user.decorator';
import { User } from './domain/entity/user.entity';
import { CreateUserInput, CreateUserOutput } from './presentation/dto/create-account.dto';
import { Public } from '../auth/decorator/public.decorator';
import { FindUserInput, FindUserOutput } from './presentation/dto/find-user.dto';
import { UpdateUserInput, UpdateUserOutput } from './presentation/dto/update-user.dto';
import { BaseOutput } from '../shared/presentation/dto/base.dto';
import { VerifyEmailInput } from './presentation/dto/verify-email.dto';
import { Role } from '../auth/decorator/role.decorator';

@Resolver()
export class UserResolver {
  constructor(private readonly factory: UserFactory) {}

  @Public()
  @Mutation(() => CreateUserOutput)
  async createUser(@Args('CreateUserInput') input: CreateUserInput): Promise<CreateUserOutput> {
    const user = await this.factory.createUser(input);
    return {
      ok: true,
      userId: user.id,
    };
  }

  @Query(() => FindUserOutput)
  async findUser(@Args('FindUserInput') input: FindUserInput): Promise<FindUserOutput> {
    const user = await this.factory.findUser(input);
    return { ok: true, user };
  }

  @Mutation(() => UpdateUserOutput)
  async updateUser(
    @Args('UpdateUserInput') input: UpdateUserInput,
    @AuthUser() authUser: User,
  ): Promise<UpdateUserOutput> {
    const user = await this.factory.updateUser(input, authUser);
    return { ok: true, user };
  }

  @Mutation(() => BaseOutput)
  async verifyEmail(@Args('VerifyEmailInput') input: VerifyEmailInput, @AuthUser() user: User): Promise<BaseOutput> {
    await this.factory.verifyEmail(input, user);
    return { ok: true };
  }
}
