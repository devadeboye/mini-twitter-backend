import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { TweetService } from '../services/tweet.service';
import { UseToken } from 'src/auth/decorators/auth.decorator';
import { Tweet } from '../entities/tweet.entity';

@Resolver('post')
export class PostResolver {
  constructor(private readonly postService: TweetService) {}

  @Mutation()
  @UseToken()
  async createPost(@Args() tweet: Tweet) {
    return this.postService.createRecord(tweet);
  }

  // @Query()
  // @UseToken()
  // async getUser(@Args('id') id: string) {
  //   return this.userService.findOneBy({ id });
  // }
}

// TODO add resolver to create a post

// TODO add resolver to delete a post

// TODO update client side (followers) on new post. using graphql subscription
