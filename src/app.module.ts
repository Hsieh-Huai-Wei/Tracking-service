import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { LogisticsModule } from './logistics/logistics.module';
import { AdminModule } from './admin/admin.module';
import { DatabaseModule } from './core/database/database.module';
import { RouterModule } from '@nestjs/core';
import { ScheduleModule } from '@nestjs/schedule';
// import { ConfigModule } from '@nestjs/config';

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
