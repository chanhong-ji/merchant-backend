import { Column, Entity, ManyToOne } from 'typeorm';
import { IMerchant } from '../../domain/merchant.interface';
import { CoreModel } from 'src/modules/common/infrastructure/typeorm/core.model';
import { UserModel } from 'src/modules/user/infrastructure/typeorm/user.model';
import { User } from 'src/modules/user/domain/user.entity';

@Entity({ name: 'merchant' })
export class MerchantModel extends CoreModel implements IMerchant {
  @Column()
  name: string;

  @Column()
  address: string;

  @Column({ nullable: true, name: 'cover_image' })
  coverImage?: string;

  @Column({ nullable: true, name: 'dong_code' })
  dongCode?: string;

  @ManyToOne(() => UserModel, (user) => user.merchants, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  user: User;
}
