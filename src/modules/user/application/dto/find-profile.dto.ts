import { IUser } from '../../domain/user.interface';

export interface IFindProfileInput {
  userId: number;
}

export interface IFindProfileOutput {
  user?: Pick<IUser, 'email' | 'role' | 'address' | 'verified' | 'dongCode'>;
}
