import { Injectable } from '@nestjs/common';
import { registerEnumType } from '@nestjs/graphql';

enum ErrorMessage {
  NOT_AUTHENTICATED = 'NOT_AUTHENTICATED',
  NOT_AUTHORIZED = 'NOT_AUTHORIZED',

  CATEGORY_NOT_FOUND = 'CATEGORY_NOT_FOUND',
  MERCHANT_NOT_FOUND = 'MERCHANT_NOT_FOUND',
  USER_NOT_FOUND = 'USER_NOT_FOUND',
  PRODUCT_NOT_FOUND = 'PRODUCT_NOT_FOUND',
  ORDER_NOT_FOUND = 'ORDER_NOT_FOUND',

  PERMISSION_DENIED = 'PERMISSION_DENIED',
  PASSWORD_WRONG = 'PASSWORD_WRONG',
  EMAIL_ALREADY_EXIST = 'EMAIL_ALREADY_EXIST',
  VERIFICATION_CODE_WRONG = 'VERIFICATION_CODE_WRONG',

  INVALID_PRODUCT = 'INVALID_PRODUCT',
}

registerEnumType(ErrorMessage, {
  name: 'ErrorMessage',
  valuesMap: {
    NOT_AUTHENTICATED: { description: '인증되지 않음' },
    NOT_AUTHORIZED: { description: '권한이 없음' },

    CATEGORY_NOT_FOUND: { description: '카테고리를 찾을 수 없음' },
    MERCHANT_NOT_FOUND: { description: '판매자를 찾을 수 없음' },
    USER_NOT_FOUND: { description: '유저를 찾을 수 없음' },
    PRODUCT_NOT_FOUND: { description: '상품을 찾을 수 없음' },
    ORDER_NOT_FOUND: { description: '주문을 찾을 수 없음' },

    PERMISSION_DENIED: { description: '권한이 없음' },
    PASSWORD_WRONG: { description: '비밀번호가 틀림' },
    EMAIL_ALREADY_EXIST: { description: '유저를 찾을 수 없음' },
    VERIFICATION_CODE_WRONG: { description: '인증 코드가 틀림' },

    INVALID_PRODUCT: { description: '유효하지 않은 상품' },
  },
});

@Injectable()
export class ErrorService {
  private readonly messages: Record<keyof typeof ErrorMessage, ErrorMessage> = {
    NOT_AUTHENTICATED: ErrorMessage.NOT_AUTHENTICATED,
    NOT_AUTHORIZED: ErrorMessage.NOT_AUTHORIZED,
    CATEGORY_NOT_FOUND: ErrorMessage.CATEGORY_NOT_FOUND,
    MERCHANT_NOT_FOUND: ErrorMessage.MERCHANT_NOT_FOUND,
    ORDER_NOT_FOUND: ErrorMessage.ORDER_NOT_FOUND,
    PERMISSION_DENIED: ErrorMessage.PERMISSION_DENIED,
    EMAIL_ALREADY_EXIST: ErrorMessage.EMAIL_ALREADY_EXIST,
    PASSWORD_WRONG: ErrorMessage.PASSWORD_WRONG,
    USER_NOT_FOUND: ErrorMessage.USER_NOT_FOUND,
    VERIFICATION_CODE_WRONG: ErrorMessage.VERIFICATION_CODE_WRONG,
    PRODUCT_NOT_FOUND: ErrorMessage.PRODUCT_NOT_FOUND,
    INVALID_PRODUCT: ErrorMessage.INVALID_PRODUCT,
  };

  get = (key: keyof typeof ErrorMessage): string => {
    return this.messages[key];
  };
}
