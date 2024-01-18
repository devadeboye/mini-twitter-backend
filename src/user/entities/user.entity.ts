import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column()
  dob: Date;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  profilePicture?: string;

  @OneToMany(() => User, (user) => user.followers)
  following: User[];

  @ManyToOne(() => User, (user) => user.id, { eager: true })
  followers: User[];

  @Column({ default: 0 })
  followersCount: number;

  @Column({ default: 0 })
  followingCount: number;
}
