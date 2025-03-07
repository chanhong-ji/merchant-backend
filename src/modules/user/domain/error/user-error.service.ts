import { Injectable } from '@nestjs/common';
import { registerEnumType } from '@nestjs/graphql';

enum UserErrorMessage {
  EMAIL_ALREADY_EXIST = 'EMAIL_ALREADY_EXIST',
  USER_NOT_FOUND = 'USER_NOT_FOUND',
  PASSWORD_WRONG = 'PASSWORD_WRONG',
}

registerEnumType(UserErrorMessage, {
  name: 'UserErrorMessage',
  description: 'User Error Message',
  valuesMap: {
    EMAIL_ALREADY_EXIST: { description: '유저를 찾을 수 없음' },
  },
});

@Injectable()
export class UserErrorService {
  private readonly messages: Record<
    keyof typeof UserErrorMessage,
    UserErrorMessage
  > = {
    EMAIL_ALREADY_EXIST: UserErrorMessage.EMAIL_ALREADY_EXIST,
    USER_NOT_FOUND: UserErrorMessage.USER_NOT_FOUND,
    PASSWORD_WRONG: UserErrorMessage.PASSWORD_WRONG,
  };

  get = (key: keyof typeof UserErrorMessage): string => {
    return this.messages[key];
  };
}
