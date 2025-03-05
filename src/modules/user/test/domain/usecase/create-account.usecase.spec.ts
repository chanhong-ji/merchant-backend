import { Test, TestingModule } from '@nestjs/testing';
import { ICreateAccountInput } from 'src/modules/user/application/dto/create-account.dto';
import { UserRepository } from 'src/modules/user/application/user.repository';
import { UserErrorService } from 'src/modules/user/domain/error/user-error.service';
import { CreateAccountUsecase } from 'src/modules/user/domain/usecase/create-account.usecase';
import { UserRole } from 'src/modules/user/domain/user-role.enum';
import { TypeormUserRepository } from 'src/modules/user/infrastructure/typeorm/typeorm-user.repository';
jest.mock('src/modules/user/infrastructure/typeorm/typeorm-user.repository');

describe('CreateAccountUsecase', () => {
  let usecase: CreateAccountUsecase;
  let repository: Record<keyof UserRepository, jest.Mock>;
  let errorService: UserErrorService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateAccountUsecase,
        TypeormUserRepository,
        UserErrorService,
      ],
    }).compile();
    usecase = module.get(CreateAccountUsecase);
    repository = module.get(TypeormUserRepository);
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

  describe('validateEmailDuplicate', () => {
    let input: ICreateAccountInput;
    beforeEach(() => {
      input = {
        email: 'random@email.com',
        password: 'password',
        role: UserRole.Client,
      };
    });
    it('해당 이메일을 가진 유저가 이미 존재하면 -> 오류 발생', async () => {
      repository.findByEmail.mockResolvedValue({ id: 1 });

      await expect(usecase.validateEmailDuplicate(input)).rejects.toThrow(
        errorService.get('EMAIL_ALREADY_EXIST'),
      );
    });
  });
});
