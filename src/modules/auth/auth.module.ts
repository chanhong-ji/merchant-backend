import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { AuthResolver } from './auth.resolver';
import { AuthFactory } from './domain/auth.factory';
import { LoginUsecase } from './domain/usecase/login.usecase';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { AuthenticationGuard } from './guard/authentication.guard';

@Module({
  imports: [
    UserModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      global: true,
      useFactory: (configService: ConfigService) => {
        return {
          secret: configService.get('auth.jwt.secret'),
          global: true,
          signOptions: { expiresIn: configService.get('auth.jwt.expiresIn') },
        };
      },
    }),
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthenticationGuard,
    },
    AuthResolver,
    AuthFactory,
    /** Usecases */
    LoginUsecase,
  ],
})
export class AuthModule {}
