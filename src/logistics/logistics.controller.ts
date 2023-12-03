import { Controller, Get, Param } from '@nestjs/common';
import { LogisticsService } from './logistics.service';

@Controller()
export class LogisticsController {
  constructor(private readonly logisticsService: LogisticsService) {}

  @Get()
  findAll() {
    return this.logisticsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.logisticsService.findOne(+id);
  }
}
