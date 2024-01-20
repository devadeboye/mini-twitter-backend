import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/utils/services/base.service';
import { Tweet } from '../entities/tweet.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TokenData } from 'src/auth/dtos/auth.dto';

@Injectable()
export class TweetService extends BaseService<Tweet> {
  constructor(
    @InjectRepository(Tweet)
    private tweetRepository: Repository<Tweet>,
  ) {
    super(tweetRepository);
  }
}
