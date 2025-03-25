import { ArgsType, Field, ObjectType, PickType } from '@nestjs/graphql';
import { BaseOutput } from 'src/modules/common/presentation/output/base.output';
import { CategoryDto } from './category.dto';

@ObjectType()
class FindAllCategory extends PickType(
  CategoryDto,
  ['id', 'name', 'coverImg'],
  ArgsType,
) {}

@ObjectType()
export class FindAllCategoriesOutput extends BaseOutput {
  @Field(() => [FindAllCategory], { nullable: true })
  categories?: FindAllCategory[];
}
