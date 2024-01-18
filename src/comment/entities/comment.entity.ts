import { Post } from 'src/post/entities/post.entity';
import { User } from 'src/user/entities/user.entity';
import { Entity, Column, ManyToOne, OneToMany } from 'typeorm';

@Entity()
export class Comment {
  @Column({ unique: true })
  id: string;

  @Column()
  content: string;

  // @Column({ nullable: true })
  // image: string;

  @Column({ default: 0 })
  likes: number;

  @Column({ default: 0 })
  retweet: number;

  @ManyToOne(() => User, (user) => user.id)
  author: User;

  @ManyToOne(() => Post, (post) => post.comments)
  post: Post;
}
