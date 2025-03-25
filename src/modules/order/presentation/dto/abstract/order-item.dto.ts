import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { OrderOption } from 'src/modules/order/domain/entity/order-item.entity';
import { IOrderItem } from 'src/modules/order/domain/interface/order-item.interface';
import { Product } from 'src/modules/product/domain/entity/product.entity';
import { ProductDto } from 'src/modules/product/presentation/dto/abstract/product.dto';
import { OrderOptionDto } from '../order-option.dto';

@ObjectType()
@InputType({ isAbstract: true })
export class OrderItemDto implements IOrderItem {
  @Field(() => Int, { description: '주문 아이디' })
  id: number;

  @Field(() => ProductDto, { description: '상품' })
  product: Product;

  @Field(() => OrderOptionDto, { description: '선택한 상품 옵션' })
  choices?: OrderOption[];

  @Field(() => Date, { description: '생성일' })
  createdAt: Date;

  @Field(() => Date, { description: '수정일' })
  updatedAt: Date;
}
