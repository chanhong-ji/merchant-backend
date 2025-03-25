import { IOrderItem } from 'src/modules/order/domain/interface/order-item.interface';
import { ProductModel } from './product.model';
import { OrderItemOption } from 'src/modules/order/domain/entity/order-item-option.entity';
import { Product } from 'src/modules/product/domain/entity/product.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { CoreModel } from './core.model';

@Entity({ name: 'order_item' })
export class OrderItemModel extends CoreModel implements IOrderItem {
  @ManyToOne(() => ProductModel)
  product: Product;

  @Column({ type: 'json', nullable: true })
  options?: OrderItemOption[];
}
