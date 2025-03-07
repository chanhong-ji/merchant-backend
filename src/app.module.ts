import { Module } from '@nestjs/common';
import {
  ApolloServerPluginLandingPageProductionDefault,
  ApolloServerPluginLandingPageLocalDefault,
} from '@apollo/server/plugin/landingPage/default';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MerchantModule } from './modules/merchant/merchant.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import configuration from './config/configuration';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      load: [configuration],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('typeorm.host'),
        port: configService.get('typeorm.port'),
        username: configService.get('typeorm.username'),
        database: configService.get('typeorm.name'),
        password: configService.get('typeorm.password'),
        autoLoadEntities: true,
        synchronize: true,
      }),
      inject: [ConfigService],
    }),

    AuthModule,
    UserModule,
    MerchantModule,
  ],
})
export class AppModule {}
