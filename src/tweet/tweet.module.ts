import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tweet } from './entities/tweet.entity';
import { TweetService } from './services/tweet.service';

@Module({
  imports: [TypeOrmModule.forFeature([Tweet])],
  providers: [TweetService],
  exports: [TweetService],
})
export class TweetModule {}
