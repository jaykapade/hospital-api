import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FamilyInfo } from './entity/family-info.entity';
import { FamilyInfoController } from './family-info.controller';
import { FamilyInfoService } from './family-info.service';

@Module({
  imports: [TypeOrmModule.forFeature([FamilyInfo])],
  controllers: [FamilyInfoController],
  providers: [FamilyInfoService],
})
export class FamilyInfoModule {}
