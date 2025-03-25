import { IUser } from '../../../modules/user/domain/interface/user.interface';
import { UserRole } from '../../../modules/user/domain/user-role.enum';
import { CoreModel } from 'src/modules/common/infrastructure/typeorm/core.model';
import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { MerchantModel } from 'src/infrastructure/merchant/model/merchant.model';
import { Merchant } from 'src/modules/merchant/domain/entity/merchant.entity';
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

  @Column({ type: 'enum', enum: UserRole, default: UserRole.Client })
  role: UserRole;

  @Column({ name: 'dong_code', nullable: true })
  dongCode?: string;

  @OneToMany(() => MerchantModel, (merchant) => merchant.owner, {
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
