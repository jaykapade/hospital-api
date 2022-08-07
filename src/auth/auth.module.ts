import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { User } from './entity/user.entity';

@Module({
  providers: [AuthService],
  controllers: [AuthController],
  //! Import Repo like this in new version of typeorm
  imports: [TypeOrmModule.forFeature([User])],
})
export class AuthModule {}
