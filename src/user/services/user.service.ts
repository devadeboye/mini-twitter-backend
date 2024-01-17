import { Injectable } from '@nestjs/common';
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
}
