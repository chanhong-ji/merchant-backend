import { Test, TestingModule } from '@nestjs/testing';
import { ErrorService } from 'src/common/error/error.service';
import { TypeormOrderRepository } from 'src/infrastructure/typeorm/repository/typeorm-order.repository';
import { TypeormProductRepository } from 'src/infrastructure/typeorm/repository/typeorm-product.repository';
import { OrderRepository } from 'src/modules/order/application/repository/order.repository';
import { CreateOrderUsecase } from 'src/modules/order/domain/usecase/create-order.usecase';
import { ProductRepository } from 'src/modules/product/application/repository/product.repository';
import { Product } from 'src/modules/product/domain/entity/product.entity';
import { createProductStub } from './stub/product.stub';
import { ICreateOrderInput } from 'src/modules/order/application/dto/create-order.dto';
import { User } from 'src/modules/user/domain/entity/user.entity';
jest.mock('src/infrastructure/typeorm/repository/typeorm-order.repository');
jest.mock('src/infrastructure/typeorm/repository/typeorm-product.repository');

describe('CreateOrderUsecase', () => {
  let usecase: CreateOrderUsecase;
  let repository: Record<keyof OrderRepository, jest.Mock>;
  let productRepo: Record<keyof ProductRepository, jest.Mock>;
  let errorService: ErrorService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateOrderUsecase,
        ErrorService,
        { provide: 'OrderRepository', useClass: TypeormOrderRepository },
        { provide: 'ProductRepository', useClass: TypeormProductRepository },
      ],
    }).compile();
    usecase = module.get(CreateOrderUsecase);
    repository = module.get('OrderRepository');
    productRepo = module.get('ProductRepository');
    errorService = module.get(ErrorService);
  });

  it('should be defined', () => {
    expect(usecase).toBeDefined();
    expect(repository).toBeDefined();
    expect(productRepo).toBeDefined();
    expect(errorService).toBeDefined();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('validProducts', () => {
    let products: Product[];
    let input: ICreateOrderInput;
    it('제품의 길이가 입력 항목의 길이와 일치하지 않는 경우 -> 에러 발생', () => {
      products = [createProductStub(), createProductStub()];
      input = { address: 'address', merchantId: 1, items: [{ productId: 1 }] };

      expect(() => usecase.validProducts(products, input)).toThrow(
        errorService.get('INVALID_PRODUCT'),
      );
    });
  });

  describe('calculateTotalPrice', () => {
    let products: Product[];
    let input: ICreateOrderInput;

    it('제품 가격과 옵션 추가 금액을 합산하여 총 가격을 계산한다', () => {
      products = [
        { id: 1, price: 1000, options: [{ name: '옵션1', extra: 500 }] } as Product,
        { id: 2, price: 2000, options: [{ name: '옵션2', extra: 1000 }] } as Product,
      ];
      input = {
        address: 'address',
        merchantId: 1,
        items: [
          { productId: 1, options: [{ name: '옵션1' }] },
          { productId: 2, options: [{ name: '옵션2' }] },
        ],
      };

      const total = usecase.calculateTotalPrice(products, input);

      expect(total).toBe(4500);
    });

    it('옵션이 없는 경우 제품 가격만 합산한다', () => {
      products = [
        { id: 1, price: 1000, options: [] as any } as Product,
        { id: 2, price: 2000, options: [] as any } as Product,
      ];
      input = {
        address: 'address',
        merchantId: 1,
        items: [{ productId: 1 }, { productId: 2 }],
      };

      const total = usecase.calculateTotalPrice(products, input);

      expect(total).toBe(3000);
    });
  });

  describe('execute', () => {
    let input: ICreateOrderInput;
    let customer: User;

    beforeEach(() => {
      input = {
        address: 'address',
        merchantId: 1,
        items: [
          { productId: 1, options: [{ name: '옵션1' }] },
          { productId: 2, options: [{ name: '옵션2' }] },
        ],
      };
      customer = { id: 1 } as User;

      jest.spyOn(usecase, 'findProducts').mockResolvedValue([]);
      jest.spyOn(usecase, 'validProducts').mockImplementation();
      jest.spyOn(usecase, 'calculateTotalPrice').mockReturnValue(4500);
      jest.spyOn(usecase, 'createOrder').mockReturnValue({} as any);
      repository.save.mockResolvedValue({ id: 1 });
      usecase.execute(input, customer);
    });
    it('findProducts : 주문하는 상품을 조회한다.', async () => {
      expect(usecase.findProducts).toHaveBeenCalled();
    });
    it('validProducts : 주문하는 상품의 유효성을 검증한다.', async () => {
      expect(usecase.validProducts).toHaveBeenCalled();
    });
    it('calculateTotalPrice : 총 가격을 계산한다.', async () => {
      expect(usecase.calculateTotalPrice).toHaveBeenCalled();
    });
    it('createOrder : 주문 엔티티를 생성한다.', async () => {
      expect(usecase.createOrder).toHaveBeenCalled();
    });
    it('repository.save : 주문을 저장한다.', async () => {
      expect(repository.save).toHaveBeenCalled();
    });
  });
});
