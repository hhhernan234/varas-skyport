import { IsString, IsUUID, IsInt, IsBoolean, IsOptional, Min, IsDecimal } from 'class-validator';

export class UpdateVueloDto {
  @IsOptional()
  @IsUUID()
  aerolineaId?: string;

  @IsOptional()
  @IsString()
  codigo?: string;

  @IsOptional()
  @IsString()
  destino?: string;

  @IsOptional()
  @IsInt()
  duracion_minutos?: number;

  @IsOptional()
  @IsDecimal()
  precio_base?: number;

  @IsOptional()
  @IsBoolean()
  activo?: boolean;

}



