import { IVerification } from '../../../domain/interface/verification.interface';
import { Column, Entity, Generated, OneToOne } from 'typeorm';
import { UserModel } from 'src/modules/user/infrastructure/typeorm/model/user.model';
import { User } from 'src/modules/user/domain/entity/user.entity';
import { CoreModel } from 'src/modules/common/infrastructure/typeorm/core.model';

@Entity({ name: 'verification' })
export class VerificationModel extends CoreModel implements IVerification {
  @Generated('uuid')
  @Column()
  code: string;

  @OneToOne(() => UserModel, (user) => user.verification, {
    onDelete: 'CASCADE',
  })
  user: User;
}
