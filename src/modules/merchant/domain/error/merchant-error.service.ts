import { Injectable } from '@nestjs/common';
import { registerEnumType } from '@nestjs/graphql';

enum MerchantErrorMessage {
  CATEGORY_NOT_FOUND = 'CATEGORY_NOT_FOUND',
}

registerEnumType(MerchantErrorMessage, {
  name: 'MerchantErrorMessage',
  description: 'Merchant Error Message',
  valuesMap: {
    CATEGORY_NOT_FOUND: { description: '카테고리를 찾을 수 없음' },
  },
});

@Injectable()
export class MerchantErrorService {
  private readonly messages: Record<
    keyof typeof MerchantErrorMessage,
    MerchantErrorMessage
  > = {
    CATEGORY_NOT_FOUND: MerchantErrorMessage.CATEGORY_NOT_FOUND,
  };

  get = (key: keyof typeof MerchantErrorMessage): string => {
    return this.messages[key];
  };
}
