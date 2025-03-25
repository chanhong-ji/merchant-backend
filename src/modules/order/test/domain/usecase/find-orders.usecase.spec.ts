import { Test, TestingModule } from '@nestjs/testing';
import { TypeormOrderRepository } from 'src/infrastructure/typeorm/repository/typeorm-order.repository';
import { IFindOrdersInput } from 'src/modules/order/application/dto/find-orders.dto';
import { OrderRepository } from 'src/modules/order/application/repository/order.repository';
import { OrderStatus } from 'src/modules/order/domain/enum/order-status.enum';
import { FindOrdersUsecase } from 'src/modules/order/domain/usecase/find-orders.usecase';
import { User } from 'src/modules/user/domain/entity/user.entity';
import { UserRole } from 'src/modules/user/domain/user-role.enum';
jest.mock('src/infrastructure/typeorm/repository/typeorm-order.repository');

describe('FindOrdersUsecase', () => {
  let usecase: FindOrdersUsecase;
  let repository: Record<keyof OrderRepository, jest.Mock>;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FindOrdersUsecase, { provide: 'OrderRepository', useClass: TypeormOrderRepository }],
    }).compile();
    usecase = module.get(FindOrdersUsecase);
    repository = module.get('OrderRepository');
  });

  it('should be defined', () => {
    expect(usecase).toBeDefined();
    expect(repository).toBeDefined();
  });

  describe('findOrders', () => {
    let user: User;
    let input: IFindOrdersInput;
    beforeEach(() => {
      user = { id: 1, role: UserRole.Client } as User;
      input = { status: OrderStatus.Pending, limit: 10, offset: 0 };
    });
    it('Client 역할의 사용자가 자신의 주문을 조회할 수 있어야 한다.', async () => {
      user.role = UserRole.Client;
      repository.findOrdersByCustomerId.mockResolvedValueOnce([]);

      expect(async () => await usecase.findOrders(user, input)).not.toThrow();
    });

    it('Owner 역할의 사용자가 자신의 주문을 조회할 수 있어야 한다.', async () => {
      user.role = UserRole.Owner;
      repository.findOrdersByOwnerId.mockResolvedValueOnce([]);

      expect(async () => await usecase.findOrders(user, input)).not.toThrow();
    });

    it('Delivery 역할의 사용자가 자신의 주문을 조회할 수 있어야 한다.', async () => {
      user.role = UserRole.Delivery;
      repository.findOrdersByDriverId.mockResolvedValueOnce([]);

      expect(async () => await usecase.findOrders(user, input)).not.toThrow();
    });
  });
});
