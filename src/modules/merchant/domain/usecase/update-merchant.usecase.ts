import {
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { MerchantRepository } from '../../application/merchant.repository';
import { IUpdateMerchantInput } from '../../application/dto/update-merchant.dto';
import { Merchant } from '../entity/merchant.entity';
import { User } from 'src/modules/user/domain/entity/user.entity';
import { MerchantErrorService } from '../error/merchant-error.service';
import { Category } from '../entity/category.entity';

@Injectable()
export class UpdateMerchantUsecase {
  constructor(
    @Inject('MerchantRepository')
    private readonly repository: MerchantRepository,
    private readonly errorService: MerchantErrorService,
  ) {}

  async execute(user: User, input: IUpdateMerchantInput): Promise<Merchant> {
    const merchant = await this.findMerchantOrThrow(input.id);
    this.validateOwnership(user, merchant);

    const updatedMerchant = merchant.update(input);

    if (input.categoryId) {
      updatedMerchant.category = await this.findCategoryOrThrow(
        input.categoryId,
      );
    }

    return await this.repository.save(updatedMerchant);
  }

  async findMerchantOrThrow(id: number): Promise<Merchant> {
    const merchant = await this.repository.findById(id);

    if (!merchant) {
      throw new NotFoundException(this.errorService.get('MERCHANT_NOT_FOUND'));
    }
    return merchant;
  }

  async findCategoryOrThrow(categoryId: number): Promise<Category> {
    const category = await this.repository.findCategoryById(categoryId);
    if (!category) {
      throw new NotFoundException(this.errorService.get('CATEGORY_NOT_FOUND'));
    }
    return category;
  }

  validateOwnership(user: User, merchant: Merchant): void {
    if (merchant.ownerId !== user.id) {
      throw new ForbiddenException(this.errorService.get('PERMISSION_DENIED'));
    }
  }
}
