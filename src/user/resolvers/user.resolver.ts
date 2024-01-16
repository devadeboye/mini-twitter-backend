import { Args, Query, Resolver } from '@nestjs/graphql';

@Resolver('User')
export class UserResolver {
  constructor() {}

  @Query()
  async getUser(@Args('id') id: number) {}
}
