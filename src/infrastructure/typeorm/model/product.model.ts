import { CoreModel } from 'src/infrastructure/typeorm/model/core.model';
import { Merchant } from 'src/modules/merchant/domain/entity/merchant.entity';
import { MerchantModel } from './merchant.model';
import { ProductOption } from 'src/modules/product/domain/entity/product-option.entity';
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
  options: ProductOption[];

  @ManyToOne(() => MerchantModel, (merchant) => merchant.products, {
    onDelete: 'CASCADE',
  })
  merchant: Merchant;

  @RelationId((product: ProductModel) => product.merchant)
  merchantId: number;
}
