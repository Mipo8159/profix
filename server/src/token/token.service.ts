import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { sign, verify } from 'jsonwebtoken';
import { UserEntity } from 'src/auth/user.entity';
import { Repository } from 'typeorm';
import { TokenPayloadDto } from './dto/jwt-payload.dto';
import { TokenEntity } from './token.entity';
import { JwtResponseInterface } from './interface/jwt-response.interface';

@Injectable()
export class TokenService {
  constructor(
    @InjectRepository(TokenEntity)
    private readonly tokenRepository: Repository<TokenEntity>,
  ) {}

  // GENERATE TOKENS
  public generateToken(payload: TokenPayloadDto): JwtResponseInterface {
    const accessToken = sign(payload, process.env.JWT_ACCESS_TOKEN_SECRET, {
      expiresIn: '15s',
    });
    const refreshToken = sign(payload, process.env.JWT_REFRESH_TOKEN_SECRET, {
      expiresIn: '30d',
    });
    return {
      accessToken,
      refreshToken,
    };
  }

  // SAVE TOKEN
  async saveToken(user: UserEntity, refreshToken: string) {
    const tokenData = await this.tokenRepository.findOne({ user });

    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      return await this.tokenRepository.save(tokenData);
    }

    const token = new TokenEntity();
    token.user = user;
    token.refreshToken = refreshToken;
    return await this.tokenRepository.save(token);
  }

  // REMOVE TOKEN
  async removeToken(refreshToken: string): Promise<string> {
    const token = await this.tokenRepository.findOne({ refreshToken });
    await this.tokenRepository.remove(token);
    return 'logged out';
  }

  // VALIDATE REFRESH TOKEN
  public validateRefreshToken(refreshToken: string) {
    try {
      const userData: any = verify(
        refreshToken,
        process.env.JWT_REFRESH_TOKEN_SECRET,
      );
      return userData;
    } catch (error) {
      return null;
    }
  }

  // VALIDATE ACCESS TOKEN
  public validateAccessToken(accessToken: string) {
    try {
      const userData: any = verify(
        accessToken,
        process.env.JWT_ACCESS_TOKEN_SECRET,
      );
      return userData;
    } catch (error) {
      return null;
    }
  }

  // FIND TOKEN IN DATABASE
  async findToken(refreshToken: string): Promise<TokenEntity> {
    const tokenData = await this.tokenRepository.findOne({ refreshToken });
    return tokenData;
  }
}
