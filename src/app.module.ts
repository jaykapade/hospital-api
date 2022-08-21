import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { User } from './auth/entity/user.entity';
import { UserInfo } from './user-info/entity/user-info.entity';
import { UserInfoModule } from './user-info/user-info.module';
import { FamilyInfoModule } from './family-info/family-info.module';
import { FamilyInfo } from './family-info/entity/family-info.entity';

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
      entities: [User, UserInfo, FamilyInfo],
      //! can autoload entities please check
      // autoLoadEntities: true,
      synchronize: true,
    }),
    UserInfoModule,
    FamilyInfoModule,
    //! Need to add this to get access the env variables in useFactory in auth.Module.ts
    ConfigModule.forRoot({ isGlobal: true }),
  ],
  controllers: [],
  providers: [
    //! Added interceptor like this if any dependencies are needed else check app.module : app.useGlobalInterceptors
    // { provide: APP_INTERCEPTOR, useClass: ClassSerializerInterceptor },
  ],
})
export class AppModule {}
