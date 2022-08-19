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
      console.log('🚀 ~ id', id);
      // const userInfo = await this.userInfoRepo.findOneBy({ id });
      const userInfo = await this.userInfoRepo
        .createQueryBuilder('userInfo')
        .leftJoinAndSelect('userInfo.user', 'user')
        .where('userInfo.userId = :userId', { userId: id })
        .getOne();
      console.log('🚀 ~ userInfo', userInfo);

      if (!userInfo) throw new NotFoundException('User not found.');

      return userInfo;
    } catch (err) {
      throw new NotFoundException(err.message);
    }
  }

  async createUserInfo(userdata: UserInfoDto, user: User) {
    console.log('🚀 ~ user', user);
    try {
      const { dob, weight, height } = userdata;
      const age = calcAge(dob);
      const bmi = calcBmi(weight, height);
      console.log('🚀 ~ bmi', bmi);

      const userInfo = await this.userInfoRepo.create(userdata);

      userInfo.age = age;
      userInfo.bmi = +bmi;
      userInfo.user = user;

      // console.log('🚀 ~ userInfo', userInfo);

      const result = await this.userInfoRepo.save(userInfo);
      console.log('🚀 ~ result', result);

      // return userInfo;
      return result;
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }
}
