import { Column, Entity, ManyToOne, RelationId } from 'typeorm';
import { CoreModel } from 'src/modules/common/infrastructure/typeorm/core.model';
import { UserModel } from 'src/modules/user/infrastructure/typeorm/model/user.model';
import { User } from 'src/modules/user/domain/entity/user.entity';
import { CategoryModel } from 'src/modules/merchant/infrastructure/typeorm/model/category.model';
import { IMerchant } from 'src/modules/merchant/domain/interface/merchant.interface';

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
  owner: User;

  @RelationId((merchant: MerchantModel) => merchant.owner)
  ownerId: number;

  @ManyToOne((type) => CategoryModel, (category) => category.merchants)
  category: CategoryModel;
}
