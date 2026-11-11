import { Controller, Get, Param } from '@nestjs/common';
import { EmpresaService } from './empresas.service';
import { EmpresaPublicaDto } from './dtos/FindBySlugDto';

@Controller('public/empresas')
export class EmpresaController {
  constructor(private readonly empresaService: EmpresaService) {}

  @Get(':slug')
  async findOneBySlug(@Param('slug') slug: string): Promise<EmpresaPublicaDto> {
    return this.empresaService.findBySlugPublic(slug);
  }
}
