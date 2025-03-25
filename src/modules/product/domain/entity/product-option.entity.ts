import { IProductOption } from '../interface/product-option.interface';

export class ProductOption implements IProductOption {
  name: string;
  choices?: string[];
  extra: number;
}
