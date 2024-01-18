import { User } from 'src/user/entities/user.entity';
import { Entity, Column, ManyToOne, OneToMany } from 'typeorm';
import { Comment } from 'src/comment/entities/comment.entity';

@Entity()
export class Post {
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

  @ManyToOne(() => User, (user) => user.id, { eager: true })
  author: User;

  @OneToMany(() => Comment, (comment) => comment.post)
  comments: Comment[];
}
