import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserService } from '../services/user.service';
import { UseToken, UserTokenData } from 'src/auth/decorators/auth.decorator';
import { TokenData } from 'src/auth/dtos/auth.dto';

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

  @Mutation()
  @UseToken()
  async followUser(
    @Args('user') userToFollow: string,
    @UserTokenData() tokenData: TokenData,
  ) {
    return this.userService.followUser(tokenData.sub, userToFollow);
  }

  // // TODO add resolver to unfollow a user
  // @Mutation()
  // async unFollowUser(
  //   @Args('user') userToUnFollow: string,
  //   @UserTokenData() tokenData: TokenData,
  // ) {
  //   return this.userService.followUser(tokenData.sub, userToUnFollow);
  // }
}
