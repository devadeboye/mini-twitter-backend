import { User } from '../../user/entities/user.entity';
import {
  Entity,
  Column,
  ManyToOne,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { TweetTypeEnum } from '../enums/tweet.enum';
import { StoredFile } from 'src/file/entities/stored-file.entity';

@Entity()
export class Tweet {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  content: string;

  @Column({ default: 0 })
  likes: number;

  @Column({ default: 0 })
  retweet: number;

  @ManyToOne(() => User, (user) => user.id, { eager: true })
  author: User;

  @Column({ type: 'enum', enum: TweetTypeEnum, default: TweetTypeEnum.Post })
  tweetType: TweetTypeEnum;

  @ManyToOne(() => Tweet, (tweet) => tweet.id)
  commentToTweet: Tweet;

  @Column({ default: 0 })
  numberOfComments: number;

  @OneToOne(() => StoredFile, (storedFile) => storedFile.id, {
    eager: true,
    nullable: true,
  })
  @JoinColumn()
  picture: StoredFile;
}
