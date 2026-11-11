/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { EmpresaPublicaDto } from './dtos/FindBySlugDto';

@Injectable()
export class EmpresaService {
  constructor(private readonly prisma: PrismaService) {}

  async findBySlugPublic(slug: string): Promise<EmpresaPublicaDto> {
    const sNormalize = slug.toLowerCase().trim();

    const empresa = await this.prisma.orm.public.Empresa.where({
      slug: sNormalize,
    })
      .include('servicos', (s) =>
        s.where({ ativo: true }).orderBy((servico) => servico.nome.asc()),
      )
      .first();

    if (!empresa) {
      throw new NotFoundException(
        `Empresa com o link ${slug} não foi encontrada`,
      );
    }

    return empresa;
  }

  // create(createDto: ) {
  //   return 'This action adds a new ';
  // }

  // findAll() {
  //   return `This action returns all s`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #id `;
  // }

  // update(id: number, updateDto: ) {
  //   return `This action updates a #id `;
  // }

  // remove(id: number) {
  //   return `This action removes a #id `;
  // }
}
