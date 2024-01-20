import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tweet } from './entities/tweet.entity';
import { TweetService } from './services/tweet.service';
import { TweetResolver } from './resolvers/tweet.resolver';
import { PubSub } from 'graphql-subscriptions';

@Module({
  imports: [TypeOrmModule.forFeature([Tweet])],
  providers: [TweetService, TweetResolver, PubSub],
  exports: [TweetService],
})
export class TweetModule {}
