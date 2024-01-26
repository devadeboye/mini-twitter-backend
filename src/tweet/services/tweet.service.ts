import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/utils/services/base.service';
import { Tweet } from '../entities/tweet.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';

@Injectable()
export class TweetService extends BaseService<Tweet> {
  constructor(
    @InjectRepository(Tweet)
    private tweetRepository: Repository<Tweet>,
  ) {
    super(tweetRepository);
  }

  async getTweets(followings: string[]): Promise<Tweet[]> {
    const tweets = await this.tweetRepository.findBy({
      author: In(followings),
    });
    return tweets;
  }
}
