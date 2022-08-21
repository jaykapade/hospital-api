import {
  BaseEntity,
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { UserInfo } from 'src/user-info/entity/user-info.entity';
import { Exclude } from 'class-transformer';
import { FamilyInfo } from 'src/family-info/entity/family-info.entity';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ unique: true })
  email: string;

  @Exclude()
  @Column()
  password: string;

  @OneToOne(() => UserInfo, (userInfo) => userInfo.user)
  userInfo: UserInfo;

  @OneToOne(() => FamilyInfo, (familyInfo) => familyInfo.user)
  familyInfo: UserInfo;
}
