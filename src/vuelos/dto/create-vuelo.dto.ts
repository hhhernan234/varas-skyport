import { IsString, IsUUID, IsInt, IsBoolean, IsOptional, Min, IsDecimal } from 'class-validator';

export class CreateVueloDto {
  @IsUUID()
  aerolineaId?: string;

  @IsString()
  codigo?: string;

  @IsString()
  destino?: string;

  @IsInt()
  duracion_minutos?: number;

  @IsInt()
  precio_base?: number;
  
  @IsOptional()
  @IsBoolean()
  activo?: boolean;

}

