import request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from 'src/app.module';
import { DataSource } from 'typeorm';
import { UserRole } from 'src/modules/user/domain/user-role.enum';
import { VerificationModel } from 'src/infrastructure/typeorm/model/verification.model';

describe('클라이언트 유저 회원가입 -> 로그인 -> 이메일 인증 -> 유저 정보 수정 플로우', () => {
  const GRAPHQL_ENDPOINT = '/graphql';
  let app: INestApplication;
  let dataSource: DataSource;
  let publicTest: (query: string) => request.Test;
  let privateTest: (query: string) => request.Test;

  let userToken: string;
  let userId: number;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleFixture.createNestApplication();
    dataSource = moduleFixture.get<DataSource>(DataSource);
    publicTest = (query: string) => request(app.getHttpServer()).post(GRAPHQL_ENDPOINT).send({ query });
    privateTest = (query: string) =>
      request(app.getHttpServer())
        .post(GRAPHQL_ENDPOINT)
        .set({ Authorization: `Bearer ${userToken}` })
        .send({ query });
    await dataSource.synchronize(true);
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('createUser -> login -> verfyEmail -> findUser -> updateUser ', () => {
    const userData = {
      email: 'first@email.com',
      password: '1234',
      role: UserRole.Client,
    };

    it('회원가입 (createUser)', async () => {
      return publicTest(`
        mutation {
          createUser(CreateUserInput: {
              email: "${userData.email}",
              password: "${userData.password}", 
              role: ${userData.role}
            }) {
            ok
            error
            userId
          }
        }`)
        .expect(200)
        .expect((res) => {
          const { ok, error, userId: createdUserId } = res.body.data.createUser;
          expect(ok).toBeTruthy();
          expect(error).toBeNull();
          expect(createdUserId).toBeDefined();
          userId = createdUserId;
        });
    });

    it('로그인 (login)', async () => {
      return publicTest(`
        mutation {
          login(LoginInput: {
              email: "${userData.email}",
              password: "${userData.password}"
            }) {
            ok
            error
            token
          }
        }`)
        .expect(200)
        .expect((res) => {
          const { ok, error, token } = res.body.data.login;
          expect(ok).toBeTruthy();
          expect(error).toBeNull();
          expect(token).toBeDefined();
          userToken = token;
        });
    });

    it('이메일 인증 (verifyEmail)', async () => {
      const verificationCode = await dataSource
        .getRepository(VerificationModel)
        .findOne({ where: { user: { id: userId } } });

      return privateTest(`
        mutation {
          verifyEmail(VerifyEmailInput: {
              code: "${verificationCode?.code}"
            }) {
            ok
            error
          }
        }`)
        .expect(200)
        .expect((res) => {
          const { ok, error } = res.body.data.verifyEmail;
          expect(ok).toBeTruthy();
          expect(error).toBeNull();
        });
    });

    it('유저 정보 조회 (findUser) ', async () => {
      return privateTest(`
        query {
          findUser(FindUserInput: {
              userId: ${userId} 
            }) {
            ok
            error
            user {
              id
              email
              role
              address
              dongCode
              verified
            }
          }
        }`)
        .expect(200)
        .expect((res) => {
          const { ok, error, user } = res.body.data.findUser;
          expect(ok).toBeTruthy();
          expect(error).toBeNull();
          expect(user.id).toBeDefined();
          expect(user.email).toBeDefined();
          expect(user.role).toBeDefined();
          expect(user.address).toBeDefined();
          expect(user.dongCode).toBeDefined();
          expect(user.verified).toBeDefined();
        });
    });

    it('유저 정보 수정 (updateUser)', async () => {
      return privateTest(`
        mutation {
          updateUser(UpdateUserInput: {
              email: "${'changedEmail@email.com'}"
            }) {
            ok
            error
            user {
              id
              email
              role
              address
              dongCode
              verified
            }
          }
        }`)
        .expect(200)
        .expect((res) => {
          const { ok, error, user } = res.body.data.updateUser;
          expect(ok).toBeTruthy();
          expect(error).toBeNull();
          expect(user.id).toBeDefined();
          expect(user.email).toBeDefined();
          expect(user.role).toBeDefined();
          expect(user.address).toBeDefined();
          expect(user.dongCode).toBeDefined();
          expect(user.verified).toBeFalsy();
        });
    });
  });
});
