import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserFactory } from './domain/user.factory';

@Resolver()
export class UserResolver {
  constructor(private readonly factory: UserFactory) {}
}
