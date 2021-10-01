import { IsEmail, Length } from 'class-validator';

export class LoginUserDto {
  @IsEmail({}, { message: 'invalid email' })
  readonly email: string;

  @Length(6, 255, { message: 'Password is too short' })
  readonly password: string;
}
