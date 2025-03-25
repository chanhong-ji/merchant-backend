import { IUser } from '../../domain/interface/user.interface';

export interface ICreateUserInput extends Pick<IUser, 'email' | 'password' | 'role'> {}
