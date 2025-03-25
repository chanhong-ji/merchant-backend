import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { ErrorService } from 'src/common/error/error.service';
import { TypeormUserRepository } from 'src/infrastructure/typeorm/repository/typeorm-user.repository';
import { UserRepository } from 'src/modules/user/application/user.repository';
import { VerifyEmailUsecase } from 'src/modules/user/domain/usecase/verify-email.usecase';
jest.mock('src/infrastructure/typeorm/repository/typeorm-user.repository');

describe('VerifyEmailUsecase', () => {
  let usecase: VerifyEmailUsecase;
  let repository: Record<keyof UserRepository, jest.Mock>;
  let errorService: ErrorService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule],
      providers: [VerifyEmailUsecase, { provide: 'UserRepository', useClass: TypeormUserRepository }, ErrorService],
    }).compile();
    usecase = module.get(VerifyEmailUsecase);
    repository = module.get('UserRepository');
    errorService = module.get(ErrorService);
  });

  it('should be defined', () => {
    expect(usecase).toBeDefined();
    expect(repository).toBeDefined();
    expect(errorService).toBeDefined;
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });
});
