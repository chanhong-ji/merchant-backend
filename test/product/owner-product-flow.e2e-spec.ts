import request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { AppModule } from 'src/app.module';
import { Test, TestingModule } from '@nestjs/testing';
import { UserRole } from 'src/modules/user/domain/user-role.enum';
import { CategoryModel } from 'src/infrastructure/typeorm/model/category.model';

describe('오너 유저 회원가입 -> 로그인 -> 판매처 생성 -> 상품 생성 -> 상품 수정 -> 상품 삭제', () => {
  const GRAPHQL_ENDPOINT = '/graphql';
  let app: INestApplication;
  let dataSource: DataSource;
  let publicTest: (query: string) => request.Test;
  let privateTest: (query: string) => request.Test;

  let userToken: string;
  let merchantId: number;
  let productId: number;

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

  describe('createUser -> login -> createMerchant -> createProduct -> updateProduct -> removeProduct', () => {
    const userData = {
      email: 'product@email.com',
      password: '1234',
      role: UserRole.Owner,
    };
    const merchantData = {
      name: '상품테스트',
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

    it('상품 생성 (createProduct)', async () => {
      return privateTest(`
            mutation {
              createProduct(CreateProductInput: {
                description: "설명입니다",
                merchantId: ${merchantId},
                name: "상품2",
                price: 2000,
                options : {
                    choices : "옵션1", 
                    extra: 2000, 
                    name: "2000원추가요금" 
                    }
                }) {
                ok
                error
                productId
              }
            }`)
        .expect(200)
        .expect((res) => {
          const { ok, error, productId: id } = res.body.data.createProduct;
          expect(ok).toBeTruthy();
          expect(error).toBeNull();
          expect(id).toBeDefined();
          productId = id;
        });
    });

    it('상품 수정 (updateProduct)', async () => {
      return privateTest(`
              mutation {
                updateProduct(UpdateProductInput: {
                    name: "상품2", 
                    description: "설명입니다",
                    price: 12000,
                    productId: ${productId},
                    options: [
                        {
                            choices: ["옵션1"],
                            extra: 100,
                            name: "옵션1"
                        }
                    ]
                  }) {
                  ok
                  error
                  product {
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
              }`)
        .expect(200)
        .expect((res) => {
          const { ok, error, product } = res.body.data.updateProduct;
          expect(ok).toBeTruthy();
          expect(error).toBeNull();
          expect(product).toBeDefined();
          expect(product.id).toBeDefined();
        });
    });

    it('상품 삭제 (removeProduct)', async () => {
      return privateTest(`
            mutation {
              removeProduct(id: ${productId}) {
                ok
                error
              }
            }`)
        .expect(200)
        .expect((res) => {
          const { ok, error } = res.body.data.removeProduct;
          expect(ok).toBeTruthy();
          expect(error).toBeNull();
        });
    });
  });
});

const initDatabase = async (dataSource: DataSource) => {
  await dataSource.getRepository(CategoryModel).save({ name: '상품테스트', slug: 'product-test' });
};
