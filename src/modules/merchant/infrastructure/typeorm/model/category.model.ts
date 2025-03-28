import { CoreModel } from 'src/modules/common/infrastructure/typeorm/core.model';
import { ICategory } from 'src/modules/merchant/domain/interface/category.interface';
import { Column, Entity, OneToMany } from 'typeorm';
import { MerchantModel } from './merchant.model';

@Entity({ name: 'category' })
export class CategoryModel extends CoreModel implements ICategory {
  @Column({ unique: true })
  name: string;

  @Column({ nullable: true, name: 'cover_image' })
  coverImg?: string;

  @OneToMany((type) => MerchantModel, (merchant) => merchant.category)
  merchants: MerchantModel[];
}
