import { IVerification } from '../interface/verification.interface';
import { User } from 'src/modules/user/domain/entity/user.entity';
import { randomUUID } from 'crypto';

export class Verification implements IVerification {
  id: number;
  code: string;
  user: User;
  createdAt: Date;
  updatedAt: Date;

  static create(user: User): Verification {
    const verification = new Verification();
    verification.user = user;
    return verification;
  }
}
