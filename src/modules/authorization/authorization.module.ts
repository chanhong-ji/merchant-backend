import { Module } from '@nestjs/common';
import { AuthorizationService } from './domain/authorization.service';

@Module({
  providers: [AuthorizationService],
  exports: [AuthorizationService],
})
export class AuthorizationModule {}
