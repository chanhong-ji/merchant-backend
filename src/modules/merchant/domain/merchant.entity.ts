import { IMerchant } from './merchant.interface';

export class Merchant implements IMerchant {
  private constructor(input: MerchantAttributes) {
    this.name = input.name;
    this.address = input.address;
    this.coverImage = input.coverImage;
    this.dongCode = input.dongCode;
  }

  id: number;
  name: string;
  address: string;
  coverImage?: string;
  dongCode?: string;
  createdAt: Date;
  updatedAt: Date;

  static create(input: MerchantAttributes) {
    return new Merchant(input);
  }
}

type MerchantAttributes = {
  name: string;
  address: string;
  coverImage?: string;
  dongCode?: string;
};
