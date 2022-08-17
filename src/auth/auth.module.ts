import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { User } from './entity/user.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy/jwt.strategy';

const jwtFactory = {
  imports: [ConfigModule],
  //! use configmodule and service to import .env data
  useFactory: async (configService: ConfigService) => ({
    secret: configService.get('JWT_SECRET'),
    signOptions: {
      expiresIn: configService.get('JWT_EXP'),
    },
  }),
  inject: [ConfigService],
};

@Global()
@Module({
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  //! Import Repo like this in new version of typeorm
  imports: [
    JwtModule.registerAsync(jwtFactory),
    // JwtModule.register({
    //   secret: 'TESTUSER',
    //   signOptions: { expiresIn: '1d' },
    // }),
    TypeOrmModule.forFeature([User]),
    PassportModule,
  ],
  exports: [PassportModule],
})
export class AuthModule {}
