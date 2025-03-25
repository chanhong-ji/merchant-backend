import { Merchant } from 'src/modules/merchant/domain/entity/merchant.entity';
import { User } from 'src/modules/user/domain/entity/user.entity';
import { IOrder } from '../interface/order.interface';
import { OrderStatus } from '../enum/order-status.enum';
import { OrderItem } from './order-item.entity';
import { Product } from 'src/modules/product/domain/entity/product.entity';
import { OrderItemOption } from './order-item-option.entity';
import { IOrderItemOption } from '../interface/order-item-optin.interface';

export class Order implements IOrder {
  id: number;
  customer?: User;
  customerId?: number;
  driver?: User;
  driverId?: number;
  merchant?: Merchant;
  items: OrderItem[];
  total: number;
  status: OrderStatus;
  createdAt: Date;
  updatedAt: Date;

  static create(input: OrderAttributes) {
    const order = new Order();
    order.total = input.total;
    order.customer = { id: input.customerId } as User;
    order.merchant = { id: input.merchantId } as Merchant;
    order.driver = undefined;
    order.status = OrderStatus.Pending;
    order.items = input.items.map((item) => {
      const orderItem = new OrderItem();
      orderItem.product = { id: item.productId } as Product;
      orderItem.options = item.options?.map((option) => {
        const orderItemOption = new OrderItemOption();
        orderItemOption.name = option.name;
        orderItemOption.choice = option.choice;
        return orderItemOption;
      });
      orderItem.options = item.options;
      return orderItem;
    });
    return order;
  }
}

type OrderAttributes = {
  total: number;
  customerId: number;
  merchantId: number;
  items: {
    productId: number;
    options?: IOrderItemOption[];
  }[];
};
