import { Resolver } from '@nestjs/graphql';
import { ProductFactory } from './domain/product.factory';

@Resolver()
export class ProductResolver {
  constructor(private readonly factory: ProductFactory) {}
}
