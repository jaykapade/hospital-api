import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/entity/user.entity';
import { calcAge, calcBmi } from 'src/utils/helper';
import { Repository } from 'typeorm';
import { UserInfoDto } from './dto/user-info.dto';
import { UserInfo } from './entity/user-info.entity';

@Injectable()
export class UserInfoService {
  constructor(
    @InjectRepository(UserInfo)
    private userInfoRepo: Repository<UserInfo>,
  ) {}

  async getUserInfo(user: User) {
    try {
      const { id } = user;
      const userInfo = await this.userInfoRepo
        .createQueryBuilder('userInfo')
        .leftJoinAndSelect('userInfo.user', 'user')
        .where('userInfo.userId = :userId', { userId: id })
        .getOne();

      if (!userInfo) throw new NotFoundException('UserInfo not found.');

      return userInfo;
    } catch (err) {
      throw new NotFoundException(err.message);
    }
  }

  async createUserInfo(userdata: UserInfoDto, user: User) {
    try {
      if (await this.getUserInfo(user))
        throw new HttpException(
          'UserInfo Already Present',
          HttpStatus.BAD_REQUEST,
        );
      const { dob, weight, height } = userdata;
      const age = calcAge(dob);
      const bmi = calcBmi(weight, height);

      const userInfo = await this.userInfoRepo.create(userdata);

      userInfo.age = age;
      userInfo.bmi = +bmi;
      userInfo.user = user;

      const result = await this.userInfoRepo.save(userInfo);

      return result;
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  async updateUserInfo(userData: UserInfoDto, user: User) {
    try {
      let userInfo = await this.getUserInfo(user);
      if (!userInfo) throw new NotFoundException('UserInfo not Found');

      userInfo = this.userInfoRepo.create({ ...userInfo, ...userData });
      return await this.userInfoRepo.save(userInfo);
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  async deleteUserInfo(user: User) {
    try {
      const userInfo = await this.getUserInfo(user);
      if (!userInfo) throw new NotFoundException('UserInfo not Found');
      const { id } = userInfo;
      const result = await this.userInfoRepo.delete(id);
      if (!result.affected) return { message: 'Delete Failed', success: false };

      return { message: 'Delete UserInfo Successful', success: true };
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }
}
