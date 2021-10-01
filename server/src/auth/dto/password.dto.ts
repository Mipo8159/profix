import { IsString, Length } from 'class-validator';

export class PassDto {
  @IsString()
  @Length(6, 255, { message: 'Password is too short' })
  readonly password: string;
}
