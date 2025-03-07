import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { ILoginInput } from 'src/modules/auth/application/dto/login.dto';
import { LoginUsecase } from 'src/modules/auth/domain/usecase/login.usecase';
import { UserRepository } from 'src/modules/user/application/user.repository';
import { UserErrorService } from 'src/modules/user/domain/error/user-error.service';
import { TypeormUserRepository } from 'src/modules/user/infrastructure/typeorm/typeorm-user.repository';
jest.mock('src/modules/user/infrastructure/typeorm/typeorm-user.repository');
jest.mock('bcrypt');

describe('LoginUsecase', () => {
  let usecase: LoginUsecase;
  let repository: Record<keyof UserRepository, jest.Mock>;
  let jwtService: JwtService;
  let errorService: UserErrorService;
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LoginUsecase,
        UserErrorService,
        JwtService,
        {
          provide: 'UserRepository',
          useClass: TypeormUserRepository,
        },
      ],
    }).compile();
    usecase = module.get(LoginUsecase);
    repository = module.get('UserRepository');
    jwtService = module.get(JwtService);
    errorService = module.get(UserErrorService);
  });
  it('should be defined', () => {
    expect(usecase).toBeDefined();
    expect(repository).toBeDefined();
    expect(jwtService).toBeDefined();
    expect(errorService).toBeDefined();
  });
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('findUser', () => {
    let input: ILoginInput;
    beforeEach(() => {
      input = {
        email: 'email.com',
        password: 'password',
      };
    });
    it('존재하지 않는 사용자를 찾으려고 할 때 오류가 발생해야 한다', async () => {
      repository.findByEmail.mockResolvedValue(null);

      await expect(usecase.findUser(input)).rejects.toThrow(
        errorService.get('USER_NOT_FOUND'),
      );
    });
  });

  describe('checkPassword', () => {
    let input: ILoginInput;
    let user: any;
    beforeEach(() => {
      input = {
        email: 'email.com',
        password: 'password',
      };
      user = {
        id: 1,
        email: 'email.com',
        password: 'hashedPassword',
      };
    });

    it('비밀번호가 일치하지 않을 때 오류가 발생해야 한다', async () => {
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      await expect(usecase.checkPassword(input, user)).rejects.toThrow(
        errorService.get('PASSWORD_WRONG'),
      );
    });

    it('비밀번호가 일치할 때 오류가 발생하지 않아야 한다', async () => {
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);

      await expect(usecase.checkPassword(input, user)).resolves.not.toThrow();
    });
  });
});
