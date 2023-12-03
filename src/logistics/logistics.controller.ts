import { Controller, Get, Query } from '@nestjs/common';
import { LogisticsService } from './logistics.service';
import { Cron, CronExpression } from '@nestjs/schedule';
@Controller()
export class LogisticsController {
  constructor(private readonly logisticsService: LogisticsService) {}

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT) // 每天0:00
  async handleCronMidnight() {
    await this.logisticsService.uploadReport();
  }

  @Cron(CronExpression.EVERY_DAY_AT_8AM) // 每天8:00
  async handleCron8AM() {
    await this.logisticsService.uploadReport();
  }

  @Cron(CronExpression.EVERY_DAY_AT_4PM) // 每天16:00
  async handleCron4PM() {
    await this.logisticsService.uploadReport();
  }

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
