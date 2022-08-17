import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
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
      //! can autoload entities please check
      // autoLoadEntities: true,
      synchronize: true,
    }),
    UserInfoModule,
    //! Need to add this to get access the env variables in useFactory in auth.Module.ts
    ConfigModule.forRoot({ isGlobal: true }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
