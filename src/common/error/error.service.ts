import { Injectable } from '@nestjs/common';
import { registerEnumType } from '@nestjs/graphql';

enum ErrorMessage {
  CATEGORY_NOT_FOUND = 'CATEGORY_NOT_FOUND',
  MERCHANT_NOT_FOUND = 'MERCHANT_NOT_FOUND',
  USER_NOT_FOUND = 'USER_NOT_FOUND',

  PERMISSION_DENIED = 'PERMISSION_DENIED',
  PASSWORD_WRONG = 'PASSWORD_WRONG',
  EMAIL_ALREADY_EXIST = 'EMAIL_ALREADY_EXIST',
  VERIFICATION_CODE_WRONG = 'VERIFICATION_CODE_WRONG',
}

registerEnumType(ErrorMessage, {
  name: 'ErrorMessage',
  valuesMap: {
    CATEGORY_NOT_FOUND: { description: '카테고리를 찾을 수 없음' },
    MERCHANT_NOT_FOUND: { description: '판매자를 찾을 수 없음' },
    USER_NOT_FOUND: { description: '유저를 찾을 수 없음' },

    PERMISSION_DENIED: { description: '권한이 없음' },
    PASSWORD_WRONG: { description: '비밀번호가 틀림' },
    EMAIL_ALREADY_EXIST: { description: '유저를 찾을 수 없음' },
    VERIFICATION_CODE_WRONG: { description: '인증 코드가 틀림' },
  },
});

@Injectable()
export class ErrorService {
  private readonly messages: Record<keyof typeof ErrorMessage, ErrorMessage> = {
    CATEGORY_NOT_FOUND: ErrorMessage.CATEGORY_NOT_FOUND,
    MERCHANT_NOT_FOUND: ErrorMessage.MERCHANT_NOT_FOUND,
    PERMISSION_DENIED: ErrorMessage.PERMISSION_DENIED,
    EMAIL_ALREADY_EXIST: ErrorMessage.EMAIL_ALREADY_EXIST,
    PASSWORD_WRONG: ErrorMessage.PASSWORD_WRONG,
    USER_NOT_FOUND: ErrorMessage.USER_NOT_FOUND,
    VERIFICATION_CODE_WRONG: ErrorMessage.VERIFICATION_CODE_WRONG,
  };

  get = (key: keyof typeof ErrorMessage): string => {
    return this.messages[key];
  };
}
