import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from '../services/auth.service';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/services/user.service';
import { NotFoundException } from '@nestjs/common';

@Resolver('auth')
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Mutation()
  async signup(@Args('user') user: User) {
    const passwordHash = await this.authService.hashPassword(user.password);
    user.password = passwordHash;
    // TODO implement cookie and send to FE
    return this.userService.createRecord(user);
  }

  @Mutation()
  async signin(@Args('user') user: User) {
    const userProfile = await this.userService.findByUsernameOrEmail(
      user.username,
    );
    if (!userProfile) {
      throw new NotFoundException('user does not exist');
    }
    await this.authService.verifyPassword(user.password, userProfile.password);

    // TODO implement cookie and send to FE
    return { ...userProfile, success: true };
  }
}
