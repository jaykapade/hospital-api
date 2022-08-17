import {
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('user')
export class UserInfoController {
  //TODO moveusegaurds on Top
  @UseGuards(JwtAuthGuard)
  @Get()
  getUserInfo() {
    return 'Passport Working';
  }

  @Post()
  createUserInfo() {
    return;
  }

  @Patch()
  updateUserInfo() {
    return;
  }

  @Delete()
  deleteUserInfo() {
    return;
  }
}
