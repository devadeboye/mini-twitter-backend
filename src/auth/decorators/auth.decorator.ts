import {
  ExecutionContext,
  SetMetadata,
  createParamDecorator,
} from '@nestjs/common';
import { TokenData } from '../dtos/auth.dto';
import { Response, Request } from 'express';
import { GqlExecutionContext } from '@nestjs/graphql';

export const UserTokenData = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context);
    const { req } = ctx.getContext() as { req: Request };
    const { res } = req as { res: Response };
    return res.locals.tokenData as TokenData;
  },
);

export const UseToken = () => SetMetadata('token', true);
