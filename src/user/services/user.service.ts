import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { BaseService } from 'src/utils/services/base.service';

@Injectable()
export class UserService extends BaseService<User> {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {
    super(usersRepository);
  }

  async findByUsernameOrEmail(identifier: string): Promise<User | null> {
    const user = await this.usersRepository
      .createQueryBuilder('user')
      .where('user.username = :identifier', { identifier })
      .orWhere('user.email = :identifier', { identifier })
      .getOne();

    return user;
  }

  async followUser(user: string, userToFollow: string) {
    try {
      const [userProfile, targetUser] = await Promise.all([
        this.findOne({
          where: {
            id: user,
          },
          relations: ['following'],
        }),
        this.findOne({
          where: {
            id: userToFollow,
          },
          relations: ['followers'],
        }),
      ]);

      // add following and increase count
      userProfile.following = [...userProfile.following, targetUser];
      userProfile.followingCount++;

      // add follower and increase count
      targetUser.followers = [...targetUser.followers, userProfile];
      targetUser.followersCount++;

      await this.usersRepository.manager.transaction(
        async (transactionalEntityManager) => {
          await transactionalEntityManager.save(userProfile);
          await transactionalEntityManager.save(targetUser);
        },
      );
      return { success: true };
    } catch (err) {
      Logger.error(err);
      throw new InternalServerErrorException(err.message);
    }
  }

  async getFollowers(user: string) {
    const profile = await this.findOne({
      where: {
        id: user,
      },
      relations: ['followers'],
    });
    const followers = profile?.followers ? profile.followers : [];
    return followers;
  }

  async getFollowings(user: string) {
    const profile = await this.findOne({
      where: {
        id: user,
      },
      relations: ['following'],
    });
    const followings = profile?.following ? profile.following : [];
    return followings;
  }
}
