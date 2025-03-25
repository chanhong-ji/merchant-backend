import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/modules/user/application/user.repository';
import { User } from 'src/modules/user/domain/entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserModel } from '../model/user.model';
import { VerificationModel } from '../model/verification.model';
import { Verification } from 'src/modules/user/domain/entity/verification.entity';

@Injectable()
export class TypeormUserRepository implements UserRepository {
  constructor(
    @InjectRepository(UserModel)
    private readonly repository: Repository<User>,
    @InjectRepository(VerificationModel)
    private readonly verificationRepository: Repository<Verification>,
  ) {}

  findById(id: number): Promise<User | null> {
    return this.repository.findOne({ where: { id } });
  }

  findByEmail(email: string): Promise<User | null> {
    return this.repository.findOne({ where: { email } });
  }

  save(user: User): Promise<User> {
    return this.repository.save(user);
  }

  findByIdWithVerification(id: number): Promise<User | null> {
    return this.repository.findOne({
      where: { id },
      relations: {
        verification: true,
      },
    });
  }

  async deleteVerification(id: number): Promise<void> {
    await this.verificationRepository.delete(id);
  }
}
