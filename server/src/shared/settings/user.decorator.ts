import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { ExpressRequest } from '../types/expressRequest.interface';

export const User = createParamDecorator((data: any, ctx: ExecutionContext) => {
  const req = ctx.switchToHttp().getRequest<ExpressRequest>();

  if (!req.user) {
    return null;
  }

  if (data) {
    return req.user[data];
  }

  return req.user;
});
