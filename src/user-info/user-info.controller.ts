import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { GetUser } from 'src/auth/decorator/get-user.decorator';
import { User } from 'src/auth/entity/user.entity';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UserInfoDto } from './dto/user-info.dto';
import { UserInfoService } from './user-info.service';

@UseGuards(JwtAuthGuard)
@Controller('user')
export class UserInfoController {
  constructor(private userInfoService: UserInfoService) {}

  //TODO moveusegaurds on Topto controller
  // @UseGuards(JwtAuthGuard)
  @Get()
  async getUserInfo(@GetUser() user: User) {
    const userInfo = await this.userInfoService.getUserInfo(user);
    if (!userInfo) throw new NotFoundException('UserInfo not found.');
    return userInfo;
  }

  @Post()
  async createUserInfo(@Body() userData: UserInfoDto, @GetUser() user: User) {
    return await this.userInfoService.createUserInfo(userData, user);
  }

  @Patch()
  async updateUserInfo(@Body() userData: UserInfoDto, @GetUser() user: User) {
    return await this.userInfoService.updateUserInfo(userData, user);
  }

  @Delete()
  async deleteUserInfo(@GetUser() user: User) {
    return await this.userInfoService.deleteUserInfo(user);
  }
}
