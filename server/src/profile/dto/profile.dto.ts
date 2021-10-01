import { GenderEnum } from 'src/profile/interface/gender.enum';

export class ProfileDto {
  readonly mobile?: string;

  readonly address?: string;

  readonly gender?: GenderEnum;

  readonly age?: number;
}
