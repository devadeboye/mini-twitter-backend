import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { TweetService } from '../services/tweet.service';
import { UseToken, UserTokenData } from 'src/auth/decorators/auth.decorator';
import { Tweet } from '../entities/tweet.entity';
import { PubSub } from 'graphql-subscriptions';
import { TweetEventEnum } from '../enums/tweet.enum';
import { TokenData } from 'src/auth/dtos/auth.dto';
import { UserService } from 'src/user/services/user.service';
import { TweetCreatedPayload } from '../dtos/tweet.dto';

@Resolver('Tweet')
export class TweetResolver {
  constructor(
    private readonly pubSub: PubSub,
    private readonly tweetService: TweetService,
    private readonly userService: UserService,
  ) {}

  @Subscription(TweetEventEnum.TweetCreated, {
    filter: (payload: TweetCreatedPayload, variables) =>
      payload.tweetCreated.author.id === variables.author ||
      payload.tweetCreated.author.username === variables.author,
  })
  tweetCreated(@Args('author') author: string) {
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
    this.pubSub.publish(TweetEventEnum.TweetCreated, {
      tweetCreated: createdTweet,
    });
    return createdTweet;
  }

  @Mutation()
  @UseToken()
  async deleteTweet(@Args('id') id: string) {
    return this.tweetService.removeOrErrorOut({ id });
  }

  @Query()
  @UseToken()
  async getTweets(@UserTokenData() tokenData: TokenData) {
    const followings = await this.userService.getFollowings(tokenData.sub);
    const followingsID = followings.map((following) => following.id);
    const tweets = await this.tweetService.getTweets(followingsID);
    return tweets;
  }
}
