import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { UserRepository } from 'src/modules/user/application/user.repository';
import { UserErrorService } from 'src/modules/user/domain/error/user-error.service';
import { VerifyEmailUsecase } from 'src/modules/user/domain/usecase/verify-email.usecase';
import { TypeormUserRepository } from 'src/modules/user/infrastructure/typeorm/typeorm-user.repository';
jest.mock('src/modules/user/infrastructure/typeorm/typeorm-user.repository');

describe('VerifyEmailUsecase', () => {
  let usecase: VerifyEmailUsecase;
  let repository: Record<keyof UserRepository, jest.Mock>;
  let errorService: UserErrorService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule],
      providers: [
        VerifyEmailUsecase,
        { provide: 'UserRepository', useClass: TypeormUserRepository },
        UserErrorService,
      ],
    }).compile();
    usecase = module.get(VerifyEmailUsecase);
    repository = module.get('UserRepository');
    errorService = module.get(UserErrorService);
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
