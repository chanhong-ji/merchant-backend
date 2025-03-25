import { registerEnumType } from '@nestjs/graphql';

export enum OrderStatus {
  Pending = 'Pending',
  Preparing = 'Preparing',
  PickedUp = 'PickedUp',
  Delivered = 'Delivered',
}

registerEnumType(OrderStatus, {
  name: 'OrderStatus',
  valuesMap: {
    Pending: { description: '접수 대기중' },
    Preparing: { description: '상품 준비중' },
    PickedUp: { description: '상품 배달중' },
    Delivered: { description: '상품 배달완료' },
  },
});
