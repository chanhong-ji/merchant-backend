import { IProduct } from 'src/modules/product/domain/interface/product.interface';

export interface IOrderOption {
  name: string;
}

export interface IOrderItem {
  id: number;
  product: IProduct;
  choices?: IOrderOption[];
  createdAt: Date;
  updatedAt: Date;
}
