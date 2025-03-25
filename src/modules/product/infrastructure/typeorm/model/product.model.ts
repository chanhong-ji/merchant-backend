import { CoreModel } from 'src/modules/common/infrastructure/typeorm/core.model';
import { MerchantModel } from 'src/modules/merchant/infrastructure/typeorm/model/merchant.model';
import { Product } from 'src/modules/product/domain/entity/product.entity';
import { IProduct } from 'src/modules/product/domain/interface/product.interface';
import { Column, Entity, ManyToOne, RelationId } from 'typeorm';

@Entity({ name: 'product' })
export class ProductModel extends CoreModel implements IProduct {
  @Column()
  name: string;

  @Column()
  price: number;

  @Column()
  photo: string;

  @Column()
  description: string;

  @ManyToOne(() => MerchantModel, (merchant) => merchant.products, {
    onDelete: 'CASCADE',
  })
  merchant: MerchantModel;

  @RelationId((product: Product) => product.merchant)
  merchantId: number;
}
