import { ArgsType, ObjectType, PickType } from '@nestjs/graphql';
import { UserDto } from './abstract/user.dto';

@ObjectType()
export class SimpleUserDto extends PickType(
  UserDto,
  ['id', 'email', 'role', 'address', 'dongCode', 'verified'],
  ArgsType,
) {}
