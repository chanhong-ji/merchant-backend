import { Injectable } from '@nestjs/common';
import { registerEnumType } from '@nestjs/graphql';

enum MerchantErrorMessage {
  CATEGORY_NOT_FOUND = 'CATEGORY_NOT_FOUND',
  MERCHANT_NOT_FOUND = 'MERCHANT_NOT_FOUND',
  PERMISSION_DENIED = 'PERMISSION_DENIED',
}

registerEnumType(MerchantErrorMessage, {
  name: 'MerchantErrorMessage',
  description: 'Merchant Error Message',
  valuesMap: {
    CATEGORY_NOT_FOUND: { description: '카테고리를 찾을 수 없음' },
    MERCHANT_NOT_FOUND: { description: '판매자를 찾을 수 없음' },
    PERMISSION_DENIED: { description: '권한이 없음' },
  },
});

@Injectable()
export class MerchantErrorService {
  private readonly messages: Record<
    keyof typeof MerchantErrorMessage,
    MerchantErrorMessage
  > = {
    CATEGORY_NOT_FOUND: MerchantErrorMessage.CATEGORY_NOT_FOUND,
    MERCHANT_NOT_FOUND: MerchantErrorMessage.MERCHANT_NOT_FOUND,
    PERMISSION_DENIED: MerchantErrorMessage.PERMISSION_DENIED,
  };

  get = (key: keyof typeof MerchantErrorMessage): string => {
    return this.messages[key];
  };
}
