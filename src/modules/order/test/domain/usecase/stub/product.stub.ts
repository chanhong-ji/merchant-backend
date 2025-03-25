import { Product } from 'src/modules/product/domain/entity/product.entity';

export const createProductStub = (): Product =>
  Product.create({
    name: 'product',
    price: 1000,
    description: 'description',
    options: [],
    photo: 'photo',
  });
