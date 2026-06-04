import { IsString, IsNumber, IsBoolean, IsOptional } from 'class-validator';

export class CreateAerolineaDto {
  @IsString()
  nombre?: string;

  @IsString()
  codigo?: string;
}