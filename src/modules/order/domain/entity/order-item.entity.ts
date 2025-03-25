import { IOrderItem } from '../interface/order-item.interface';
import { Product } from 'src/modules/product/domain/entity/product.entity';
import { OrderItemOption } from './order-item-option.entity';

export class OrderItem implements IOrderItem {
  id: number;
  product: Product;
  options?: OrderItemOption[];
  createdAt: Date;
  updatedAt: Date;
}
