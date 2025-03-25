import { Column, Entity, ManyToOne, OneToMany, RelationId } from 'typeorm';
import { CoreModel } from 'src/infrastructure/typeorm/model/core.model';
import { UserModel } from './user.model';
import { User } from 'src/modules/user/domain/entity/user.entity';
import { CategoryModel } from './category.model';
import { IMerchant } from 'src/modules/merchant/domain/interface/merchant.interface';
import { ProductModel } from './product.model';
import { Order } from 'src/modules/order/domain/entity/order.entity';
import { OrderModel } from './order.model';
import { Product } from 'src/modules/product/domain/entity/product.entity';
import { Category } from 'src/modules/merchant/domain/entity/category.entity';

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

  @OneToMany(() => ProductModel, (product) => product.merchant)
  products: Product[];

  @OneToMany(() => OrderModel, (order) => order.merchant)
  orders: Order[];

  @ManyToOne(() => CategoryModel, (category) => category.merchants)
  category: Category;
}
