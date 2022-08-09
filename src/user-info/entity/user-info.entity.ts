import { User } from 'src/auth/entity/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class UserInfo {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  first_name: string;
  @Column()
  last_name: string;
  @Column()
  mobile_no: string;
  @Column()
  dob: Date;
  @Column()
  age: number;
  @Column()
  weight: number;
  @Column()
  height: number;
  @Column()
  bmi: number;
  @Column()
  origin: string;
  @Column()
  isDiabetic: boolean;
  @Column()
  hasCardiacIssues: boolean;
  @Column()
  hasHighBP: boolean;

  @OneToOne(() => User, (user) => user.userInfo, { onDelete: 'CASCADE' })
  @JoinColumn()
  user: User;
}
