import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class UpdateFamilyInfoDto {
  @IsString()
  father_name?: string;
  @IsNumber()
  father_age?: number;
  @IsString()
  father_origin?: string;
  @IsString()
  mother_name?: string;
  @IsNumber()
  mother_age?: number;
  @IsString()
  mother_origin?: string;
  @IsBoolean()
  isDiabetic?: boolean;
  @IsBoolean()
  hasCardiacIssues?: boolean;
  @IsBoolean()
  hasHighBP?: boolean;
}
