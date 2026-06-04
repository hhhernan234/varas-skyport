import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vuelo } from './vuelo.entity';
import { Aerolinea } from '../aerolineas/aerolinea.entity';
import { CreateVueloDto } from './dto/create-vuelo.dto';
import { UpdateVueloDto } from './dto/update-vuelo.dto';

@Injectable()
export class VuelosService {
  constructor(
    @InjectRepository(Vuelo)
    private readonly vueloRepository: Repository<Vuelo>,

    @InjectRepository(Aerolinea)
    private readonly aerolineaRepository: Repository<Aerolinea>,
  ) {}

  async create(createVueloDto: CreateVueloDto) {
    const aerolinea = await this.aerolineaRepository.findOne({ where: { id: createVueloDto.aerolineaId } });
    if (!aerolinea) throw new NotFoundException('Plan no encontrado');

    const vuelo = this.vueloRepository.create({
      codigo:      createVueloDto.codigo,
      destino:      createVueloDto.destino,
      duracion_minutos: createVueloDto.duracion_minutos ?? 0,
      precio_base: createVueloDto.precio_base ?? 0,
      activo:      createVueloDto.activo ?? true,
      aerolinea,
    });
    return this.vueloRepository.save(vuelo);
  }

  findAll() {
    return this.vueloRepository.find();
  }

  async findOne(id: string) {
    const vuelo = await this.vueloRepository.findOne({ where: { id } });
    if (!vuelo) throw new NotFoundException('Vuelo no encontrado');
    return vuelo;
  }

  async update(id: string, updateVueloDto: UpdateVueloDto) {
    const vuelo = await this.findOne(id);

    if (updateVueloDto.aerolineaId) {
      const aerolinea = await this.aerolineaRepository.findOne({ where: { id: updateVueloDto.aerolineaId } });
      if (!aerolinea) throw new NotFoundException('Aerolinea no encontrada');
      vuelo.aerolinea = aerolinea;
    }

    Object.assign(vuelo, updateVueloDto);
    return this.vueloRepository.save(vuelo);
  }

  async remove(id: string) {
    const vuelo = await this.findOne(id);
    return this.vueloRepository.remove(vuelo);
  }
}