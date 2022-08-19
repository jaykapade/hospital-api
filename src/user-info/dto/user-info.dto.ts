import {
  IsBoolean,
  IsDate,
  IsEmail,
  IsNumber,
  IsString,
} from 'class-validator';

export class UserInfoDto {
  @IsString()
  first_name: string;
  @IsString()
  last_name: string;
  @IsString()
  mobile_no: string;
  @IsString()
  dob: string;
  @IsNumber()
  weight: number;
  @IsNumber()
  height: number;
  @IsString()
  origin: string;
  @IsBoolean()
  isDiabetic: boolean;
  @IsBoolean()
  hasCardiacIssues: boolean;
  @IsBoolean()
  hasHighBP: boolean;
}
