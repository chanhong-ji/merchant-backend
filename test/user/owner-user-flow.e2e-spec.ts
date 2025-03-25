import request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { AppModule } from 'src/app.module';
import { Test, TestingModule } from '@nestjs/testing';
import { UserRole } from 'src/modules/user/domain/user-role.enum';
import { CategoryModel } from 'src/infrastructure/typeorm/model/category.model';

describe('오너 유저 회원가입 -> 로그인 -> 판매처 생성 -> 조회 -> 수정', () => {
  const GRAPHQL_ENDPOINT = '/graphql';
  let app: INestApplication;
  let dataSource: DataSource;
  let publicTest: (query: string) => request.Test;
  let privateTest: (query: string) => request.Test;

  let userToken: string;
  let merchantId: number;

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
  beforeAll(async () => {
    await initDatabase(dataSource);
  });
  afterAll(async () => {
    await app.close();
  });

  describe('createUser -> login -> createMerchant -> findMerchantById -> updateMerchant', () => {
    const userData = {
      email: 'second@email.com',
      password: '1234',
      role: UserRole.Owner,
    };
    const merchantData = {
      name: '한식집',
      address: '주소',
      dongCode: '1111',
      categoryId: 1,
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

    it('판매처 생성 (createMechant)', async () => {
      return privateTest(`
            mutation {
              createMerchant(CreateMerchantInput: {
                  address: "${merchantData.address}",
                  dongCode: "${merchantData.dongCode}",
                  name: "${merchantData.name}",
                  categoryId: ${merchantData.categoryId},
                }) {
                ok
                error
                merchant {
                    id
                    name
                    address
                    coverImage
                    dongCode
                }
              }
            }`)
        .expect(200)
        .expect((res) => {
          const { ok, error, merchant } = res.body.data.createMerchant;
          expect(ok).toBeTruthy();
          expect(error).toBeNull();
          expect(merchant).toBeDefined();
          expect(merchant.id).toBeDefined();
          expect(merchant.name).toBeDefined();
          expect(merchant.address).toBeDefined();
          expect(merchant.dongCode).toBeDefined();
          merchantId = merchant.id;
        });
    });

    it('판매처 조회 (findMerchantById)', async () => {
      return privateTest(`
                query {
                findMerchantById(FindMerchantByIdInput: {
                    id: ${merchantId}
                }) {
                    ok
                    error
                    merchant {
                        id
                        name
                        address
                        coverImage
                        dongCode
                        products {
                            id
                            name
                            price
                            photo
                            description
                            options {
                                name
                                extra
                                choices
                                }
                            }
                        }
                }
                }`)
        .expect(200)
        .expect((res) => {
          const { ok, error, merchant } = res.body.data.findMerchantById;
          expect(ok).toBeTruthy();
          expect(error).toBeNull();
          expect(merchant).toBeDefined();
          expect(merchant.id).toBeDefined();
          expect(merchant.name).toBeDefined();
          expect(merchant.address).toBeDefined();
          expect(merchant.dongCode).toBeDefined();
        });
    });

    it('판매처 수정 (updateMerchant)', async () => {
      const updatedData = {
        name: '수정된 한식집',
        address: '수정된 주소',
        dongCode: '2222',
      };

      return privateTest(`
            mutation {
              updateMerchant(UpdateMerchantInput: {
                  id: ${merchantId},
                  name: "${updatedData.name}",
                  address: "${updatedData.address}",
                  dongCode: "${updatedData.dongCode}",
                }) {
                ok
                error
                merchantId
              }
            }`)
        .expect(200)
        .expect((res) => {
          const { ok, error, merchantId } = res.body.data.updateMerchant;
          expect(ok).toBeTruthy();
          expect(error).toBeNull();
          expect(merchantId).toBeDefined();
        });
    });
  });
});

const initDatabase = async (dataSource: DataSource) => {
  await dataSource.getRepository(CategoryModel).save({ name: '한식', slug: 'korean' });
};
