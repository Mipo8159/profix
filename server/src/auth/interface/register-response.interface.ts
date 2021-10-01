import { UserEntity } from '../user.entity';

export interface RegisterResponseInterface {
  user: UserEntity;
  accessToken: string;
}
