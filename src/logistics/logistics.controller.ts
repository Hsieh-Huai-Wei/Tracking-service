import { Controller, Get, Param, Query } from '@nestjs/common';
import { LogisticsService } from './logistics.service';

@Controller()
export class LogisticsController {
  constructor(private readonly logisticsService: LogisticsService) {}

  @Get('report')
  async getReport() {
    return this.logisticsService.report();
  }

  @Get()
  async findOne(@Query('sno') sno: number) {
    const result = await this.logisticsService.findOne(sno);
    return result;
  }
}
