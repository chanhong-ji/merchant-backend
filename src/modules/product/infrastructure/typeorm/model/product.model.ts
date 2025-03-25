import { CoreModel } from 'src/modules/common/infrastructure/typeorm/core.model';
import { Merchant } from 'src/modules/merchant/domain/entity/merchant.entity';
import { MerchantModel } from 'src/modules/merchant/infrastructure/typeorm/model/merchant.model';
import { Product } from 'src/modules/product/domain/entity/product.entity';
import { IOption } from 'src/modules/product/domain/interface/item.interface';
import { IProduct } from 'src/modules/product/domain/interface/product.interface';
import { Column, Entity, ManyToOne, RelationId } from 'typeorm';

@Entity({ name: 'product' })
export class ProductModel extends CoreModel implements IProduct {
  @Column()
  name: string;

  @Column()
  price: number;

  @Column({ nullable: true })
  photo?: string;

  @Column()
  description: string;

  @Column({ type: 'json' })
  options: IOption[];

  @ManyToOne(() => MerchantModel, (merchant) => merchant.products, {
    onDelete: 'CASCADE',
  })
  merchant: Merchant;

  @RelationId((product: Product) => product.merchant)
  merchantId: number;
}
