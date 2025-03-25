import { IOrderItem, IOrderOption } from '../interface/order-item.interface';
import { Product } from 'src/modules/product/domain/entity/product.entity';

export class OrderOption implements IOrderOption {
  name: string;
}

export class OrderItem implements IOrderItem {
  id: number;
  product: Product;
  choices?: OrderOption[];
  createdAt: Date;
  updatedAt: Date;
}
