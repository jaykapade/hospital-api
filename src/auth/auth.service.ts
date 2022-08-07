import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class AuthService {
  singUp(userObj: CreateUserDto) {
    return userObj;
  }
  login(userObj: CreateUserDto) {
    return { login: true, userObj };
  }
}
