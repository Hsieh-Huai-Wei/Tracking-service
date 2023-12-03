import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { accountProviders } from 'src/models/account.provider';
import { detailProviders } from '../models/detail.provider';
import { locationProviders } from '../models/location.provider';
import { logisticsProviders } from '../models/logistics.provider';

@Module({
  controllers: [AdminController],
  providers: [
    AdminService,
    ...accountProviders,
    ...detailProviders,
    ...locationProviders,
    ...logisticsProviders,
  ],
})
export class AdminModule {}
