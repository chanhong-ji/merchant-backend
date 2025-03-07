import { Injectable } from '@nestjs/common';
import { LoginUsecase } from './usecase/login.usecase';
import { ILoginInput } from '../application/dto/login.dto';

@Injectable()
export class AuthFactory {
  constructor(private readonly loginUsecase: LoginUsecase) {}

  login(input: ILoginInput): Promise<string> {
    return this.loginUsecase.execute(input);
  }
}
