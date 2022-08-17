import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './register-user.dto';

//If same dto can use Partial like this
export class LoginUserDto extends PartialType(CreateUserDto) {}
