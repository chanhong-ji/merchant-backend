import { IVerification } from '../../../auth/domain/entity/verification.interface';
import { User } from 'src/modules/user/domain/entity/user.entity';

export class Verification implements IVerification {
  code: string;
  user: User;
  createdAt: Date;
  updatedAt: Date;
}
