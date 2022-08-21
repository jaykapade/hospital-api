import { User } from 'src/auth/entity/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class FamilyInfo {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  father_name: string;
  @Column()
  father_age: number;
  @Column()
  father_origin: string;
  @Column()
  mother_name: string;
  @Column()
  mother_age: number;
  @Column()
  mother_origin: string;
  @Column()
  isDiabetic: boolean;
  @Column()
  hasCardiacIssues: boolean;
  @Column()
  hasHighBP: boolean;

  @OneToOne(() => User, (user) => user.familyInfo, { onDelete: 'CASCADE' })
  @JoinColumn()
  user: User;
}
