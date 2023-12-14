import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { accountProviders } from 'src/models/account.provider';
import { detailProviders } from '../models/detail.provider';
import { locationProviders } from '../models/location.provider';
import { logisticsProviders } from '../models/logistics.provider';
import { LogisticsController } from './logistics.controller';
import { LogisticsService } from './logistics.service';
import { createClient } from 'redis';
@Module({
  imports: [ScheduleModule.forRoot()],
  controllers: [LogisticsController],
  providers: [
    LogisticsService,
    ...accountProviders,
    ...detailProviders,
    ...locationProviders,
    ...logisticsProviders,
    {
      provide: 'REDIS_CLIENT',
      async useFactory() {
        const client = createClient({
          socket: {
            host: process.env.REDIS_HOST || 'localhost',
            port: Number(process.env.REDIS_PORT) || 6379,
          },
        });
        await client.connect();
        console.log('redis is connected');
        return client;
      },
    },
  ],
})
export class LogisticsModule {}
