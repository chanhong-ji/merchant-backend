import { IOrderItem } from 'src/modules/order/domain/interface/order-item.interface';
import { ProductModel } from './product.model';
import { OrderOption } from 'src/modules/order/domain/entity/order-item.entity';
import { Product } from 'src/modules/product/domain/entity/product.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { CoreModel } from './core.model';

@Entity({ name: 'order_item' })
export class OrderItemModel extends CoreModel implements IOrderItem {
  @ManyToOne(() => ProductModel)
  product: Product;

  @Column({ type: 'json', nullable: true })
  choices?: OrderOption[];
}
