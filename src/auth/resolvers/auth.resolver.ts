import {
  Args,
  Context,
  GqlExecutionContext,
  Mutation,
  Resolver,
} from '@nestjs/graphql';
import { AuthService } from '../services/auth.service';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/services/user.service';
import { UnauthorizedException } from '@nestjs/common';

@Resolver('auth')
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Mutation()
  async signup(@Args('user') user: User, @Context() context: any) {
    const passwordHash = await this.authService.hashPassword(user.password);
    user.password = passwordHash;
    const savedUser = await this.userService.createRecord(user);

    const accessToken = await this.authService.generateJwt({
      sub: savedUser.id,
      username: savedUser.username,
    });

    this.authService.setCookie(context, 'twitterClone', accessToken);
    return savedUser;
  }

  @Mutation()
  async signin(@Args('credentials') user: User, @Context() context: any) {
    const userProfile = await this.userService.findByUsernameOrEmail(
      user.username,
    );
    if (!userProfile) {
      throw new UnauthorizedException('invalid login credentials');
    }
    await this.authService.verifyPassword(user.password, userProfile.password);
    const accessToken = await this.authService.generateJwt({
      sub: userProfile.id,
      username: userProfile.username,
    });

    this.authService.setCookie(context, 'twitterClone', accessToken);
    return userProfile;
  }
}
