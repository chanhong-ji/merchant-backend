import { Injectable } from '@nestjs/common';
import { registerEnumType } from '@nestjs/graphql';

enum ProductErrorMessage {}

registerEnumType(ProductErrorMessage, {
  name: 'ProductErrorMessage',
  description: 'Product Error Message',
  valuesMap: {},
});

@Injectable()
export class ProductErrorService {
  private readonly messages: Record<
    keyof typeof ProductErrorMessage,
    ProductErrorMessage
  > = {};

  get = (key: keyof typeof ProductErrorMessage): string => {
    return this.messages[key];
  };
}
