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
import { CookieDto } from '../dtos/auth.dto';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly authService: AuthService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const useToken = this.reflector.get<boolean>('token', ctx.getHandler());
    if (!useToken) return true;

    const { req } = ctx.getContext() as { req: Request };
    const { res } = req as { res: Response };

    const accessToken = req.cookies?.twitterClone;
    if (!accessToken) {
      throw new UnauthorizedException('cookie not found');
    }

    const tokenData = await this.authService.verifyJwt(accessToken);
    if (!tokenData) {
      throw new UnauthorizedException('invalid accessToken!');
    }
    res.locals.tokenData = tokenData;

    return true;
  }
}
