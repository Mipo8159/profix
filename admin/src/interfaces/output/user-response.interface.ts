import { UserInterface } from '../input/user.interface';

export interface UserResponseInterface {
  user: UserInterface;
  accessToken: string;
}
