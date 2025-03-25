import { IProduct } from 'src/modules/product/domain/interface/product.interface';
import { IOrderItemOption } from './order-item-optin.interface';

export interface IOrderItem {
  id: number;
  product: IProduct;
  options?: IOrderItemOption[];
  createdAt: Date;
  updatedAt: Date;
}
