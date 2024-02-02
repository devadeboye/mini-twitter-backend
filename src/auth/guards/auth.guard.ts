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
import { CookieDto, SessionDataDto, TokenData } from '../dtos/auth.dto';

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

    const { cookies } = req as { cookies: CookieDto };
    const sessionId = cookies?.sub;
    const accessToken = cookies?.secInfo;

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

      if (!sessionId) {
        this.authService.deleteCookie(res, 'sub');
        this.authService.deleteCookie(res, 'secInfo');

        throw new UnauthorizedException(
          'your session has expired, kindly login and try again',
        );
      }
      res.locals.tokenData = tokenData;
    } catch (err) {
      if (err.name === 'TokenExpiredError') {
        const oldTokenData = (await this.authService.decodeJwt(
          accessToken,
        )) as TokenData;

        const sessionData = (await this.authService.decodeJwt(
          sessionId,
        )) as SessionDataDto;

        const userDetails = await this.userService.findOneBy({
          id: oldTokenData.sub,
        });

        // check if info in session data match that of user
        if (sessionData.username !== userDetails.username) {
          this.authService.deleteCookie(res, 'sub');
          this.authService.deleteCookie(res, 'secInfo');

          throw new UnauthorizedException(
            'your session has expired, kindly login and try again',
          );
        }

        // check if data in token match that of user
        const userMatch =
          oldTokenData.sub === userDetails.id &&
          oldTokenData.username === userDetails.username;

        if (userMatch) {
          const newToken = await this.authService.generateJwt({
            sub: oldTokenData.sub,
            username: oldTokenData.username,
          });

          this.authService.setCookie(ctx.getContext(), 'secInfo', newToken);
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
