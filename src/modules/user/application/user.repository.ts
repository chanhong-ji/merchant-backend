import { User } from '../domain/entity/user.entity';

export interface UserRepository {
  findByEmail(email: string): Promise<User | null>;
  findById(id: number): Promise<User | null>;
  findByIdWithVerification(id: number): Promise<User | null>;
  save(user: User): Promise<User>;
  deleteVerification(id: number): Promise<void>;
}
