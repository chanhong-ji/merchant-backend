import { IUser } from 'src/modules/user/domain/interface/user.interface';
import { UserRole } from 'src/modules/user/domain/user-role.enum';
import { CoreModel } from 'src/infrastructure/typeorm/model/core.model';
import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { MerchantModel } from './merchant.model';
import { Merchant } from 'src/modules/merchant/domain/entity/merchant.entity';
import { VerificationModel } from './verification.model';
import { OrderModel } from './order.model';
import { Order } from 'src/modules/order/domain/entity/order.entity';

@Entity({ name: 'user' })
export class UserModel extends CoreModel implements IUser {
  @Column({ unique: true })
  email: string;

  @Column()
  verified: boolean;

  @Column({ nullable: true })
  address: string;

  @OneToMany(() => OrderModel, (order) => order.items)
  orders: Order[];

  @OneToMany(() => OrderModel, (order) => order.driver)
  rides: Order[];

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
