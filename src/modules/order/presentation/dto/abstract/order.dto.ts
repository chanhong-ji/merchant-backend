import { IOrder } from '../../../domain/interface/order.interface';
import { OrderStatus } from '../../../domain/enum/order-status.enum';
import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { UserDto } from 'src/modules/user/presentation/dto/abstract/user.dto';
import { Product } from 'src/modules/product/domain/entity/product.entity';
import { Merchant } from 'src/modules/merchant/domain/entity/merchant.entity';
import { User } from 'src/modules/user/domain/entity/user.entity';
import { ProductDto } from 'src/modules/product/presentation/dto/abstract/product.dto';
import { MerchantDto } from 'src/modules/merchant/presentation/dto/abstract/merchant.dto';

@ObjectType()
@InputType({ isAbstract: true })
export class OrderDto implements IOrder {
  @Field(() => UserDto, { description: '주문자', nullable: true })
  customer?: User;

  @Field(() => UserDto, { description: '주문자', nullable: true })
  driver?: User;

  @Field(() => MerchantDto, { description: '판매처', nullable: true })
  merchant?: Merchant;

  @Field(() => [ProductDto], { description: '주문 상품' })
  products: Product[];

  @Field(() => OrderStatus, { description: '주문 상태' })
  status: OrderStatus;

  @Field(() => Int, { description: '총 가격' })
  total: number;
}
