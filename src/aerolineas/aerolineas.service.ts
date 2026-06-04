import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Aerolinea } from './aerolinea.entity';
import { CreateAerolineaDto } from './dto/create-aerolinea.dto';
import { UpdateAerolineaDto } from './dto/update-aerolinea.dto';

@Injectable()
export class AerolineasService {
  constructor(
    @InjectRepository(Aerolinea)
    private readonly planRepository: Repository<Aerolinea>,
  ) {}

  create(createAerolineaDto: CreateAerolineaDto) {
    const aerolinea = this.planRepository.create(createAerolineaDto);
    return this.planRepository.save(aerolinea);
  }

  findAll() {
    return this.planRepository.find({ relations: { vuelos: true } });
  }

  async findOne(id: string) {
    const aerolinea = await this.planRepository.findOne({ where: { id }, relations: { vuelos: true } });
    if (!aerolinea) throw new NotFoundException('Aerolinea no encontrada');
    return aerolinea;
  }

  async update(id: string, updateAerolineaDto: UpdateAerolineaDto) {
    const aerolinea = await this.findOne(id);
    Object.assign(aerolinea, updateAerolineaDto);
    return this.planRepository.save(aerolinea);
  }

  async remove(id: string) {
    const aerolinea = await this.planRepository.findOne({ where: { id }, relations: { vuelos: true } });
    if (!aerolinea) throw new NotFoundException('Plan no encontrado');
    if (aerolinea.vuelos && aerolinea.vuelos.length > 0)
      throw new BadRequestException('No se puede eliminar una aerolinea con vuelos activos');
    return this.planRepository.remove(aerolinea);
  }
}