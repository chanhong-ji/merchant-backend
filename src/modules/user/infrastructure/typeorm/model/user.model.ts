import { IUser } from '../../../domain/interface/user.interface';
import { UserRole } from '../../../domain/user-role.enum';
import { CoreModel } from 'src/modules/common/infrastructure/typeorm/core.model';
import { Column, Entity, OneToMany, OneToOne } from 'typeorm';
import { MerchantModel } from 'src/modules/merchant/infrastructure/typeorm/merchant.model';
import { Merchant } from 'src/modules/merchant/domain/merchant.entity';

@Entity({ name: 'user' })
export class UserModel extends CoreModel implements IUser {
  @Column({ unique: true })
  email: string;

  @Column()
  verified: boolean;

  @Column({ nullable: true })
  address: string;

  @Column({ select: false })
  password: string;

  @Column()
  role: UserRole;

  @Column({ name: 'dong_code', nullable: true })
  dongCode?: string;

  @OneToMany(() => MerchantModel, (merchant) => merchant.user, {
    cascade: true,
  })
  merchants: Merchant[];
}
