import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(@Body() createUserDto: CreateUserDto) {
    console.log(createUserDto);
    return this.authService.singUp(createUserDto);
  }
  @Post('/login')
  login(@Body() createUserDto: CreateUserDto) {
    console.log(createUserDto);
    return this.authService.login(createUserDto);
  }
}
