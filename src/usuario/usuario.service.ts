import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Usuario } from './entities/usuario.entity';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { CreateUsuarioDto } from './dto/create-usuario.dto';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectModel(Usuario)
    private usuario: typeof Usuario,
  ) {}

  create(createUsuarioDto: CreateUsuarioDto) {
    return this.usuario.create({
      name: createUsuarioDto.name,
    });
  }

  findAll() {
    return this.usuario.findAll();
  }

  findOne(id: string) {
    return this.usuario.findByPk(id, { rejectOnEmpty: true });
  }

  async update(id: string, updateUsuarioDto: UpdateUsuarioDto) {
    const usuario = await this.usuario.findByPk(id, { rejectOnEmpty: true });
    usuario.update({ name: updateUsuarioDto.name });
    return usuario;
  }

  async remove(id: string) {
    const usuario = await this.usuario.findByPk(id, { rejectOnEmpty: true });
    usuario.destroy();
  }
}
