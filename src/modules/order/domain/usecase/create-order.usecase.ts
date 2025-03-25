import { Inject, Injectable } from '@nestjs/common';
import { OrderRepository } from '../../application/repository/order.repository';
import { ICreateOrderInput } from '../../application/dto/create-order.dto';
import { User } from 'src/modules/user/domain/entity/user.entity';
import { Order } from '../entity/order.entity';
import { ProductRepository } from 'src/modules/product/application/repository/product.repository';
import { ErrorService } from 'src/common/error/error.service';
import { GraphQLError } from 'graphql';
import { Product } from 'src/modules/product/domain/entity/product.entity';

@Injectable()
export class CreateOrderUsecase {
  constructor(
    @Inject('OrderRepository') private readonly repository: OrderRepository,
    @Inject('ProductRepository') private readonly productRepo: ProductRepository,
    private readonly error: ErrorService,
  ) {}

  async execute(input: ICreateOrderInput, customer: User): Promise<Order> {
    const products = await this.findProducts(input);
    this.validProducts(products, input);
    const total = this.calculateTotalPrice(products, input);
    const order = this.createOrder(input, customer, total);
    return this.repository.save(order);
  }

  async findProducts(input: ICreateOrderInput): Promise<Product[]> {
    const ids = input.items.map((product) => product.productId);
    const products = await this.productRepo.findByIds(input.merchantId, ids);
    return products;
  }

  validProducts(products: Product[], input: ICreateOrderInput): void {
    if (products.length != input.items.length) {
      throw new GraphQLError(this.error.get('INVALID_PRODUCT'));
    }
  }

  calculateTotalPrice(products: Product[], input: ICreateOrderInput): number {
    let result = 0;

    for (const product of products) {
      result += product.price;

      const inputProduct = input.items.find((item) => item.productId === product.id);
      const chosenOptionNames = inputProduct?.options?.map((op) => op.name) || [];
      const productOptions = product.options.filter((op) => chosenOptionNames.includes(op.name));

      for (const option of productOptions) {
        result += option.extra;
      }
    }
    return result;
  }

  createOrder(input: ICreateOrderInput, customer: User, total: number): Order {
    return Order.create({
      total,
      customerId: customer.id,
      merchantId: input.merchantId,
      items: input.items,
    });
  }
}
