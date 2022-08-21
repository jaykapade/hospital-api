import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/entity/user.entity';
import { Repository } from 'typeorm';
import { FamilyInfoDto } from './dto/family-dto.dto';
import { UpdateFamilyInfoDto } from './dto/update-family-dto.dto';
import { FamilyInfo } from './entity/family-info.entity';

@Injectable()
export class FamilyInfoService {
  constructor(
    @InjectRepository(FamilyInfo)
    private familyInfoRepo: Repository<FamilyInfo>,
  ) {}

  async getFamilyInfo(user: User) {
    try {
      const { id } = user;
      const familyInfo = await this.familyInfoRepo
        .createQueryBuilder('familyInfo')
        .leftJoinAndSelect('familyInfo.user', 'user')
        .where('familyInfo.userId = :userId', { userId: id })
        .getOne();

      return familyInfo;
    } catch (err) {
      throw new NotFoundException(err.message);
    }
  }

  async createFamilyInfo(familydata: FamilyInfoDto, user: User) {
    try {
      if (await this.getFamilyInfo(user))
        throw new HttpException(
          'FamilyInfo Already Present',
          HttpStatus.BAD_REQUEST,
        );
      const familyInfo = await this.familyInfoRepo.create(familydata);
      familyInfo.user = user;
      const result = await this.familyInfoRepo.save(familyInfo);
      return result;
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  async updateFamilyInfo(familydata: UpdateFamilyInfoDto, user: User) {
    try {
      let familyInfo = await this.getFamilyInfo(user);
      if (!familyInfo) throw new NotFoundException('FamilyInfo not Found');

      familyInfo = this.familyInfoRepo.create({ ...familyInfo, ...familydata });
      return await this.familyInfoRepo.save(familyInfo);
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  async deleteFamilyInfo(user: User) {
    try {
      const familyInfo = await this.getFamilyInfo(user);
      if (!familyInfo) throw new NotFoundException('FamilyInfo not Found');
      const { id } = familyInfo;
      const result = await this.familyInfoRepo.delete(id);
      if (!result.affected) return { message: 'Delete Failed', success: false };

      return { message: 'Delete FamilyInfo Successful', success: true };
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }
}
