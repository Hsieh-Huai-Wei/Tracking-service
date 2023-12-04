import { Module } from '@nestjs/common';
import { LogisticsService } from './logistics.service';
import { LogisticsController } from './logistics.controller';
import { accountProviders } from 'src/models/account.provider';
import { detailProviders } from '../models/detail.provider';
import { locationProviders } from '../models/location.provider';
import { logisticsProviders } from '../models/logistics.provider';
import { ScheduleModule } from '@nestjs/schedule';
import { CacheModule } from '@nestjs/cache-manager';
@Module({
  imports: [ScheduleModule.forRoot(), CacheModule.register()],
  controllers: [LogisticsController],
  providers: [
    LogisticsService,
    ...accountProviders,
    ...detailProviders,
    ...locationProviders,
    ...logisticsProviders,
  ],
})
export class LogisticsModule {}
