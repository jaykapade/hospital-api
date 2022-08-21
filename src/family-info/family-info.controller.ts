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
import { FamilyInfoDto } from './dto/family-dto.dto';
import { FamilyInfoService } from './family-info.service';

@UseGuards(JwtAuthGuard)
@Controller('family')
export class FamilyInfoController {
  constructor(private familyInfoService: FamilyInfoService) {}
  @Get()
  async getFamilyInfo(@GetUser() user: User) {
    const familyInfo = await this.familyInfoService.getFamilyInfo(user);
    if (!familyInfo) throw new NotFoundException('FamilyInfo not found.');
    return familyInfo;
  }

  @Post()
  async createFamilyInfo(
    @Body() familyData: FamilyInfoDto,
    @GetUser() user: User,
  ) {
    return await this.familyInfoService.createFamilyInfo(familyData, user);
  }

  @Patch()
  async updateFamilyInfo(
    @Body() familyData: FamilyInfoDto,
    @GetUser() user: User,
  ) {
    return await this.familyInfoService.updateFamilyInfo(familyData, user);
  }

  @Delete()
  async deleteFamilyInfo(@GetUser() user: User) {
    return await this.familyInfoService.deleteFamilyInfo(user);
  }
}
