import { Controller, Delete, Get, Patch, Post } from '@nestjs/common';

@Controller('user')
export class UserInfoController {
  @Get()
  getUserInfo() {
    return;
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
