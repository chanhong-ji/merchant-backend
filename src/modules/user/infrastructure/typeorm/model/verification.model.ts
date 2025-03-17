import { IVerification } from '../../../domain/interface/verification.interface';
import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserModel } from 'src/modules/user/infrastructure/typeorm/model/user.model';
import { User } from 'src/modules/user/domain/entity/user.entity';

@Entity({ name: 'verification' })
export class VerificationModel implements IVerification {
  @PrimaryGeneratedColumn()
  id: number;

  @Generated('uuid')
  @Column()
  code: string;

  @OneToOne(() => UserModel, (user) => user.verification, {
    onDelete: 'CASCADE',
  })
  user: User;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
