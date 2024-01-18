import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Response, Request } from 'express';
import { AuthService } from '../services/auth.service';
import { UserService } from 'src/user/services/user.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const useToken = this.reflector.get<boolean>('token', ctx.getHandler());
    if (!useToken) return true;

    const { req } = ctx.getContext() as { req: Request };
    const { res } = req as { res: Response };

    const accessToken = req.cookies?.twitterClone;
    if (!accessToken) {
      throw new UnauthorizedException(
        'you need to be signed in to access this resource',
      );
    }

    try {
      const tokenData = await this.authService.verifyJwt(accessToken);
      if (!tokenData) {
        throw new UnauthorizedException(
          'you need to be signed in to access this resource',
        );
      }
      res.locals.tokenData = tokenData;
    } catch (err) {
      if (err.name === 'TokenExpiredError') {
        const oldTokenData = await this.authService.decodeJwt(accessToken);
        const userDetails = await this.userService.findOneBy({
          id: oldTokenData.sub,
        });

        const userMatch =
          oldTokenData.sub === userDetails.id &&
          oldTokenData.username === userDetails.username;

        if (userMatch) {
          const newToken = await this.authService.generateJwt({
            sub: oldTokenData.sub,
            username: oldTokenData.username,
          });

          this.authService.setCookie(
            ctx.getContext(),
            'twitterClone',
            newToken,
          );
          return true;
        }
        throw new UnauthorizedException(
          'your session has expired, kindly login and try again',
        );
      }
      throw new UnauthorizedException(err.message);
    }

    return true;
  }
}
