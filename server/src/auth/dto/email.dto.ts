import { IsEmail } from 'class-validator';

export class EmailDto {
  @IsEmail({}, { message: 'invalid email' })
  readonly email: string;
}
