import { IOrderItemOption } from '../interface/order-item-optin.interface';

export class OrderItemOption implements IOrderItemOption {
  name: string;
  choice?: string;
}
