import { IUser } from '../../../domain/interface/user.interface';
import { UserRole } from '../../../domain/user-role.enum';
import { CoreModel } from 'src/modules/common/infrastructure/typeorm/core.model';
import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { MerchantModel } from 'src/modules/merchant/infrastructure/typeorm/merchant.model';
import { Merchant } from 'src/modules/merchant/domain/merchant.entity';
import { Verification } from 'src/modules/user/domain/entity/verification.entity';
import { VerificationModel } from './verification.model';

@Entity({ name: 'user' })
export class UserModel extends CoreModel implements IUser {
  @Column({ unique: true })
  email: string;

  @Column()
  verified: boolean;

  @Column({ nullable: true })
  address: string;

  @Column()
  password: string;

  @Column()
  role: UserRole;

  @Column({ name: 'dong_code', nullable: true })
  dongCode?: string;

  @OneToMany(() => MerchantModel, (merchant) => merchant.user, {
    cascade: true,
  })
  merchants: Merchant[];

  @OneToOne(() => VerificationModel, (verification) => verification.user, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  @JoinColumn({ name: 'verification_id', referencedColumnName: 'id' })
  verification?: VerificationModel;
}
