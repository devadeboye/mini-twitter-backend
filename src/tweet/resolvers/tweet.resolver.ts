import { Args, Mutation, Resolver, Subscription } from '@nestjs/graphql';
import { TweetService } from '../services/tweet.service';
import { UseToken, UserTokenData } from 'src/auth/decorators/auth.decorator';
import { Tweet } from '../entities/tweet.entity';
import { PubSub } from 'graphql-subscriptions';
import { TweetEventEnum } from '../enums/tweet.enum';
import { TokenData } from 'src/auth/dtos/auth.dto';
import { UserService } from 'src/user/services/user.service';

@Resolver('Tweet')
export class TweetResolver {
  constructor(
    private readonly pubSub: PubSub,
    private readonly tweetService: TweetService,
    private readonly userService: UserService,
  ) {}

  @Subscription(() => Tweet)
  tweetCreated() {
    return this.pubSub.asyncIterator(TweetEventEnum.TweetCreated);
  }

  @Mutation()
  @UseToken()
  async createTweet(
    @Args('tweet') tweet: Tweet,
    @UserTokenData() tokenData: TokenData,
  ) {
    const author = await this.userService.findOneBy({ id: tokenData.sub });
    tweet.author = author;
    const createdTweet = await this.tweetService.createRecord(tweet);
    this.pubSub.publish(TweetEventEnum.TweetCreated, createdTweet);
    return createdTweet;
  }

  @Mutation()
  @UseToken()
  async deleteTweet(@Args('id') id: string) {
    return this.tweetService.removeOrErrorOut({ id });
    return this.tweetService.remove({ id });
  }
}

// TODO add resolver to delete a post

// TODO update client side (followers) on new post. using graphql subscription
