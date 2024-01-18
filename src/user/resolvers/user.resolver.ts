import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserService } from '../services/user.service';
import { UseToken } from 'src/auth/decorators/auth.decorator';

@Resolver('User')
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query()
  @UseToken()
  async getUser(@Args('id') id: number) {
    return this.userService.findOneBy({ id });
  }

  @Query()
  async getUserByUsernameOrEmail(@Args('identifier') identifier: string) {
    return this.userService.findByUsernameOrEmail(identifier);
  }

  @Mutation()
  async removeUser(@Args('id') id: number) {
    return this.userService.remove({ id });
  }
}
