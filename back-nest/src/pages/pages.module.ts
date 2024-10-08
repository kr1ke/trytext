import { Module } from '@nestjs/common';
import { PagesService } from './pages.service';
import { PagesController } from './pages.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Page } from './entities/page.entity';

@Module({
  controllers: [PagesController],
  providers: [PagesService],
  imports: [TypeOrmModule.forFeature([Page])],
})
export class PagesModule {}
