import { IUser } from '../../domain/interface/user.interface';

export interface IFindUserInput {
  userId: number;
}

export interface IFindUserOutput {
  user?: Pick<IUser, 'email' | 'role' | 'address' | 'verified' | 'dongCode'>;
}
