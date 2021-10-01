import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Response } from 'express';
import { AuthService } from 'src/auth/auth.service';
import { TokenService } from 'src/token/token.service';
import { ExpressRequest } from '../types/expressRequest.interface';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private readonly authService: AuthService,
    private readonly tokenService: TokenService,
  ) {}
  async use(req: ExpressRequest, _: Response, next: NextFunction) {
    if (!req.headers.authorization) {
      req.user = null;
      next();
      return;
    }

    const token = req.headers.authorization.split(' ')[1];
    const userData = this.tokenService.validateAccessToken(token);

    try {
      const user = await this.authService.findById(userData.id);
      req.user = user;

      next();
    } catch (error) {
      req.user = null;
      next();
    }
  }
}
