import { User } from '../domain/user.entity';

export interface UserRepository {
  save(user: User): Promise<User>;
}
