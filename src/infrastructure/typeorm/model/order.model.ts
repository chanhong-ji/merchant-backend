import { Column, Entity, JoinTable, ManyToMany, ManyToOne } from 'typeorm';
import { CoreModel } from './core.model';
import { IOrder } from 'src/modules/order/domain/interface/order.interface';
import { User } from 'src/modules/user/domain/entity/user.entity';
import { Merchant } from 'src/modules/merchant/domain/entity/merchant.entity';
import { OrderStatus } from 'src/modules/order/domain/enum/order-status.enum';
import { MerchantModel } from './merchant.model';
import { UserModel } from './user.model';
import { OrderItem } from 'src/modules/order/domain/entity/order-item.entity';
import { OrderItemModel } from './order-item.model';

@Entity({ name: 'order' })
export class OrderModel extends CoreModel implements IOrder {
  @ManyToOne(() => UserModel, (user) => user.orders, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  customer?: User;

  @ManyToOne(() => UserModel, (user) => user.rides, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  driver?: User;

  @ManyToOne(() => MerchantModel, (merchant) => merchant.orders, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  merchant?: Merchant;

  @ManyToMany(() => OrderItemModel)
  @JoinTable()
  items: OrderItem[];

  @Column()
  total: number;

  @Column({ type: 'enum', enum: OrderStatus })
  status: OrderStatus;
}
