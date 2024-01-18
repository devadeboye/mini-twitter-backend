import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserService } from '../services/user.service';
import { UseToken } from 'src/auth/decorators/auth.decorator';

@Resolver('User')
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query()
  @UseToken()
  async getUser(@Args('id') id: string) {
    return this.userService.findOneBy({ id });
  }

  @Query()
  @UseToken()
  async getUserByUsernameOrEmail(@Args('identifier') identifier: string) {
    return this.userService.findByUsernameOrEmail(identifier);
  }

  @Mutation()
  @UseToken()
  async removeUser(@Args('id') id: string) {
    return this.userService.remove({ id });
  }
}
