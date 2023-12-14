import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { ScheduleModule } from '@nestjs/schedule';
import { AdminModule } from './admin/admin.module';
import { AppController } from './app.controller';
import { DatabaseModule } from './core/database/database.module';
import { LogisticsModule } from './logistics/logistics.module';

@Module({
  imports: [
    ScheduleModule,
    DatabaseModule,
    LogisticsModule,
    RouterModule.register([
      {
        path: '/query',
        module: LogisticsModule,
      },
      {
        path: '/fake',
        module: AdminModule,
      },
    ]),
    AdminModule,
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
