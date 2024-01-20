import {
  BadRequestException,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcryptjs';
import { EnvironmentEnum, EnvironmentType } from 'src/config/enums/config.enum';
import { JwtService } from '@nestjs/jwt';
import { TokenData } from '../dtos/auth.dto';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Request, Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private jwtService: JwtService,
  ) {}

  async hashPassword(password: string): Promise<string> {
    return new Promise((resolve) => {
      bcrypt.hash(password, 10, (err: Error, hash: string) => {
        if (err) throw new BadRequestException(err.message);
        resolve(hash);
      });
    });
  }

  async verifyPassword(
    rawPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    try {
      return await bcrypt.compare(rawPassword, hashedPassword);
    } catch (e: unknown) {
      const err = e as Error;
      throw new BadRequestException(err.message);
    }
  }

  setCookie(context: any, key: string, value: string) {
    const { res } = context.req as { res: Response };
    const env = this.configService.get(EnvironmentEnum.NODE_ENV);

    res.cookie(key, value, {
      httpOnly: true,
      secure: true,
      sameSite: env === EnvironmentType.production ? 'strict' : 'lax',
      maxAge: +this.configService.get(
        EnvironmentEnum.COOKIE_LIFESPAN_IN_MILLISECONDS,
      ),
    });
  }

  async generateJwt(payload: Record<string, unknown>) {
    const accessToken = await this.jwtService.signAsync(payload);
    return accessToken;
  }

  async verifyJwt(accessToken: string): Promise<TokenData> {
    try {
      const tokenData = (await this.jwtService.verifyAsync(accessToken, {
        secret: this.configService.get<string>(EnvironmentEnum.TOKEN_SECRET),
      })) as TokenData;
      return tokenData;
    } catch (err) {
      if (err.name === 'TokenExpiredError') throw err;
      throw new UnauthorizedException(err.message);
    }
  }

  async decodeJwt(accessToken: string): Promise<TokenData> {
    const { payload } = (await this.jwtService.decode(accessToken, {
      complete: true,
    })) as { payload: TokenData };
    return payload;
  }
}
