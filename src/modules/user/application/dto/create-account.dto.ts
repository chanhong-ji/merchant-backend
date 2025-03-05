import { IUser } from '../../domain/user.interface';

export interface ICreateAccountInput
  extends Pick<IUser, 'email' | 'password' | 'role'> {}
