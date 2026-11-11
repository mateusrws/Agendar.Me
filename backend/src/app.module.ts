import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './database/prisma.module';
import { EmpresaModule } from './modules/empresas/empresa.module';

@Module({
  imports: [PrismaModule, EmpresaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
