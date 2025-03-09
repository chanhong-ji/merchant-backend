import { IUser } from '../../domain/interface/user.interface';

export interface ICreateAccountInput
  extends Pick<IUser, 'email' | 'password' | 'role'> {}
