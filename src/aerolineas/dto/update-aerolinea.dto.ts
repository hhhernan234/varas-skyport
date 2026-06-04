import { IsString, IsNumber, IsBoolean, IsOptional } from 'class-validator';

export class UpdateAerolineaDto {
  @IsOptional()
  @IsString()
  nombre?: string;

  @IsOptional()
  @IsNumber()
  codigo?: string;
}