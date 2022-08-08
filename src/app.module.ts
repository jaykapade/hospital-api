import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { User } from './auth/entity/user.entity';
import { UserInfo } from './user-info/entity/user-info.entity';
import { UserInfoModule } from './user-info/user-info.module';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'hospital',
      entities: [User, UserInfo],
      synchronize: true,
    }),
    UserInfoModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
