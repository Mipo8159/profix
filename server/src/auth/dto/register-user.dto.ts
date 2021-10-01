import { IsEmail, IsString, Length } from 'class-validator';

export class RegisterUserDto {
  @IsString({ message: 'please enter your firstname' })
  readonly firstname: string;

  @IsString({ message: 'please enter your lastname' })
  readonly lastname: string;

  @IsEmail({}, { message: 'invalid email' })
  readonly email: string;

  @Length(6, 255, { message: 'Password is too short' })
  readonly password: string;
}
