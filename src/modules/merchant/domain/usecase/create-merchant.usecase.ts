import { Inject, Injectable } from '@nestjs/common';
import { ICreateMerchantInput } from '../../application/dto/create-merchant.dto';
import { MerchantRepository } from '../../application/repository/merchant.repository';
import { Merchant } from '../entity/merchant.entity';
import { User } from 'src/modules/user/domain/entity/user.entity';
import { CategoryRepository } from '../../application/repository/category.repository';
import { ErrorService } from 'src/common/error/error.service';

@Injectable()
export class CreateMerchantUsecase {
  constructor(
    @Inject('MerchantRepository')
    private readonly merchantRepo: MerchantRepository,
    @Inject('CategoryRepository')
    private readonly categoryRepo: CategoryRepository,
    private readonly errorService: ErrorService,
  ) {}
  async execute(user: User, input: ICreateMerchantInput): Promise<Merchant> {
    const category = await this.categoryRepo.findById(input.categoryId);
    if (!category) {
      throw new Error(this.errorService.get('CATEGORY_NOT_FOUND'));
    }
    const merchant = Merchant.create(input);
    merchant.category = category;
    merchant.owner = user;
    return this.merchantRepo.save(merchant);
  }
}
