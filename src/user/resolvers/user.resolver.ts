import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserService } from '../services/user.service';
import { User } from '../entities/user.entity';

@Resolver('User')
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query()
  async getUser(@Args('id') id: number) {
    return this.userService.findById(id);
  }

  @Mutation()
  async signup(@Args('user') user: User) {
    return this.userService.create(user);
  }

  @Mutation()
  async removeUser(@Args('id') id: number) {
    return this.userService.remove(id);
  }
}
