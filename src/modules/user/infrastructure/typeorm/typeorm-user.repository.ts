import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../application/user.repository';

@Injectable()
export class TypeormUserRepository implements UserRepository {}
