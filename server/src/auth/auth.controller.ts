import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Req,
  Res,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ProfileDto } from 'src/profile/dto/profile.dto';
import { AuthGuard } from 'src/shared/guards/auth.guard';
import { BackendValidationPipe } from 'src/shared/pipes/backendValidation.pipe';
import { User } from 'src/shared/settings/user.decorator';
import { AuthService } from './auth.service';
import { EmailDto } from './dto/email.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { PassDto } from './dto/password.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { RegisterResponseInterface } from './interface/register-response.interface';
import { UserEntity } from './user.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // REGISTER
  @Post('register')
  @UsePipes(new BackendValidationPipe())
  public async register(
    @Res({ passthrough: true }) res: Response,
    @Body('userDto') userDto: RegisterUserDto,
    @Body('profileDto') profileDto: ProfileDto,
  ): Promise<RegisterResponseInterface> {
    return await this.authService.register(userDto, profileDto, res);
  }

  // LOGIN
  @HttpCode(200)
  @Post('login')
  @UsePipes(new BackendValidationPipe())
  public async login(
    @Res({ passthrough: true }) res: Response,
    @Body() dto: LoginUserDto,
  ) {
    return await this.authService.login(dto, res);
  }

  // LOG OUT
  @Post('logout')
  public async logout(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ): Promise<string> {
    const { refreshToken } = req.cookies;
    const result = await this.authService.logout(refreshToken);
    res.clearCookie('refreshToken');
    return result;
  }

  // ACTIVATE
  @Get('activate/:link')
  public async activate(@Res() res: Response, @Param('link') link: string) {
    await this.authService.activate(link);
    return res.redirect(process.env.CLIENT_URL);
  }

  // RESET PASSWORD MAIL
  @Post('/reset-mail')
  @UsePipes(new BackendValidationPipe())
  public async resetPasswordMail(@Body() emailDto: EmailDto) {
    return await this.authService.forgottenPasswordMail(emailDto.email);
  }

  // RESET PASSWORD FORM
  @Post('/reset-form/:link')
  @UsePipes(new BackendValidationPipe())
  public async resetPasswordForm(
    @Res({ passthrough: true }) res: Response,
    @Param('link') link: string,
    @Body() passDto: PassDto,
  ) {
    await this.authService.forgottenPasswordForm(passDto, link);
    return res.redirect(process.env.CLIENT_URL);
  }

  // REFRESH
  @Get('refresh')
  public async refresh(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { refreshToken } = req.cookies;
    return await this.authService.refresh(res, refreshToken);
  }

  // GER USERS
  @Get('users')
  @UseGuards(AuthGuard)
  public async getUsers(@User('id') user: UserEntity) {
    console.log(user);
    return await this.authService.getMany();
  }
}
