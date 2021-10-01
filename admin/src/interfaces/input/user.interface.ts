import { ProfileInterface } from './profile.interface';

export interface UserInterface {
  id: number;
  email: string;
  createdAt: string;
  updatedAt: string;
  isActivated: boolean;
  role: string;
  profile?: ProfileInterface;
}
