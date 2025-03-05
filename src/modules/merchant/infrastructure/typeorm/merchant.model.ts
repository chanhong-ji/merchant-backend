import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IMerchant } from '../../domain/merchant.interface';

@Entity({ name: 'merchant' })
export class MerchantModel implements IMerchant {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  address: string;

  @Column({ nullable: true, name: 'cover_image' })
  coverImage?: string;

  @Column({ nullable: true, name: 'dong_code' })
  dongCode?: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
