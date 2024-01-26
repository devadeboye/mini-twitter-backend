import { StoredFile } from 'src/file/entities/stored-file.entity';
import { Tweet } from '../entities/tweet.entity';

export class TweetCreatedPayload {
  tweetCreated: Tweet;
}

export class NewTweet {
  tweet: Tweet;
  image?: StoredFile;
}
