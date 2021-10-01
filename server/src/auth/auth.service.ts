import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MailService } from 'src/mail/mail.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { UserEntity } from './user.entity';
import { v4 } from 'uuid';
import { TokenService } from 'src/token/token.service';
import { TokenPayloadDto } from 'src/token/dto/jwt-payload.dto';
import { RegisterResponseInterface } from './interface/register-response.interface';
import { Response } from 'express';
import { compare, genSalt, hash } from 'bcrypt';
import { Repository } from 'typeorm';
import { ProfileService } from 'src/profile/profile.service';
import { PassDto } from './dto/password.dto';
import { ProfileDto } from 'src/profile/dto/profile.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly mailService: MailService,
    private readonly tokenService: TokenService,
    private readonly profileService: ProfileService,
  ) {}

  // REGISTER
  async register(
    userDto: RegisterUserDto,
    profileDto: ProfileDto,
    res: Response,
  ): Promise<RegisterResponseInterface> {
    const candidate = await this.userRepository.findOne({
      email: userDto.email,
    });
    if (candidate) {
      throw new HttpException(
        'This email is already taken',
        HttpStatus.BAD_REQUEST,
      );
    }
    //--> save user & profile
    const user = new UserEntity();
    Object.assign(user, userDto);

    const activationLink = v4();
    const forgottenPasswordLink = v4();
    const salt = await genSalt(10);

    user.password = await hash(userDto.password, salt);
    user.activationLink = activationLink;
    user.forgottenPasswordLink = forgottenPasswordLink;

    if (profileDto) {
      const profile = await this.profileService.createProfile(profileDto);
      user.profile = profile;
    }

    await this.userRepository.save(user);
    delete user.password;
    delete user.activationLink;
    delete user.forgottenPasswordLink;

    //--> send comfirmation mail
    await this.mailService.sendConfirmationMail(
      userDto.email,
      `${process.env.API_URL}/api/auth/activate/${activationLink}`,
    );
    //--> generate access & refresh tokens
    const tokenPayload = new TokenPayloadDto(user);
    const tokens = this.tokenService.generateToken({ ...tokenPayload });
    await this.tokenService.saveToken(user, tokens.refreshToken);
    //--> setting cookie
    res.cookie('refreshToken', tokens.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    return { user, accessToken: tokens.accessToken };
  }

  // LOGIN
  async login(
    dto: LoginUserDto,
    res: Response,
  ): Promise<RegisterResponseInterface> {
    const user = await this.userRepository.findOne(
      { email: dto.email },
      {
        select: [
          'id',
          'email',
          'password',
          'createdAt',
          'updatedAt',
          'isActivated',
          'role',
        ],
      },
    );
    if (!user) {
      throw new HttpException('user not found', HttpStatus.BAD_REQUEST);
    }
    const isMatch = await compare(dto.password, user.password);
    if (!isMatch) {
      throw new HttpException('incorrect password', HttpStatus.BAD_REQUEST);
    }
    delete user.password;

    //--> generate access & refresh tokens
    const tokenPayload = new TokenPayloadDto(user);
    const tokens = this.tokenService.generateToken({ ...tokenPayload });
    await this.tokenService.saveToken(user, tokens.refreshToken);

    //--> setting cookie
    res.cookie('refreshToken', tokens.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    return { user, accessToken: tokens.accessToken };
  }

  // ACTIVATE ACCOUNT
  async activate(activationLink: string): Promise<string> {
    const user = await this.userRepository.findOne({ activationLink });
    if (!user) {
      throw new HttpException('user not found', HttpStatus.UNAUTHORIZED);
    }
    user.isActivated = true;
    await this.userRepository.save(user);

    return 'success';
  }

  // RESET PASSWORD MAIL
  async forgottenPasswordMail(email: string): Promise<string> {
    const user = await this.userRepository.findOne(
      { email },
      { select: ['email', 'forgottenPasswordLink'] },
    );
    if (!user) {
      throw new HttpException('user not found', HttpStatus.UNAUTHORIZED);
    }
    //--> send password reset mail
    const forgottenPasswordLink = user.forgottenPasswordLink;
    await this.mailService.forgottenPasswordMail(
      email,
      `${process.env.API_URL}/api/auth/reset-form/${forgottenPasswordLink}`,
    );

    return 'email sent';
  }

  // RESET PASSWORD FORM
  async forgottenPasswordForm(
    passDto: PassDto,
    forgottenPasswordLink: string,
  ): Promise<string> {
    const user = await this.userRepository.findOne({ forgottenPasswordLink });
    if (!user) {
      throw new HttpException('user not found', HttpStatus.UNAUTHORIZED);
    }
    const salt = await genSalt(10);
    user.password = await hash(passDto.password, salt);
    await this.userRepository.save(user);

    return 'password changed';
  }

  // REFRESH TOKEN
  async refresh(
    res: Response,
    refreshToken: string,
  ): Promise<RegisterResponseInterface> {
    if (!refreshToken) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }

    //--> validating token
    const userData = this.tokenService.validateRefreshToken(refreshToken);
    //--> searching token in database
    const tokenFromDB = await this.tokenService.findToken(refreshToken);
    if (!userData || !tokenFromDB) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }

    //--> generate access & refresh tokens
    const user = await this.userRepository.findOne({ id: userData.id });
    const tokenPayload = new TokenPayloadDto(user);

    const tokens = this.tokenService.generateToken({ ...tokenPayload });
    await this.tokenService.saveToken(user, tokens.refreshToken);

    //--> setting cookie
    res.cookie('refreshToken', tokens.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    return { user, accessToken: tokens.accessToken };
  }

  // LOGOUT
  async logout(refreshToken: string): Promise<string> {
    if (!refreshToken) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
    return await this.tokenService.removeToken(refreshToken);
  }

  // FIND USER BY ID
  async findById(id: number): Promise<UserEntity> {
    return await this.userRepository.findOne(id);
  }

  // GET USERS
  async getMany() {
    return await this.userRepository.find({ relations: ['profile'] });
  }
}
