import { IUser } from 'src/modules/user/domain/interface/user.interface';

export interface IVerification {
  id: number;
  code: string;
  user: IUser;
  createdAt: Date;
  updatedAt: Date;
}
