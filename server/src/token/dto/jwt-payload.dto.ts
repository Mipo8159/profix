import { UserEntity } from 'src/auth/user.entity';

export class TokenPayloadDto {
  public email;
  public id;
  public isActivated;

  constructor(user: UserEntity) {
    this.email = user.email;
    this.id = user.id;
    this.isActivated = user.isActivated;
  }
}
