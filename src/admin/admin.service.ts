import { Inject, Injectable } from '@nestjs/common';
import { Location, Logistics, Account, Detail } from 'src/models';
import {
  ACCOUNT_REPOSITORY,
  DETAIL_REPOSITORY,
  LOCATION_REPOSITORY,
  LOGISTICS_REPOSITORY,
} from '../core/database/constants/index';
import * as fs from 'fs-extra';

@Injectable()
export class AdminService {
  constructor(
    @Inject(ACCOUNT_REPOSITORY) private readonly account_repo: typeof Account,
    @Inject(DETAIL_REPOSITORY) private readonly detail_repo: typeof Detail,
    @Inject(LOCATION_REPOSITORY)
    private readonly location_repo: typeof Location,
    @Inject(LOGISTICS_REPOSITORY)
    private readonly logistics_repo: typeof Logistics,
  ) {}
  async create(count: number) {
    try {
      const logisticsList = [];
      const locationList = await this.location_repo.findAll();
      const accountList = await this.account_repo.findAll();
      const statusList = [
        'created',
        'package_received',
        'in_transit',
        'out_for_delivery',
        'delivered',
        'returned_to_sender',
        'exception',
      ];
      for (let i = 0; i < count; i++) {
        const location =
          locationList[Math.floor(Math.random() * locationList.length)];
        const account =
          accountList[Math.floor(Math.random() * accountList.length)];
        const status =
          statusList[Math.floor(Math.random() * statusList.length)];
        const createLogisticsPayload = {
          id: Math.floor(Math.random() * 9999).toString(),
          sno: Math.floor(Math.random() * 9999).toString(),
          tracking_status: status,
          estimated_delivery: JSON.stringify(Date.now()),
          recipient_id: account.id,
          current_location_id: location.id,
        };
        const logisticsRes = await this.logistics_repo.create(
          createLogisticsPayload,
          {
            returning: true,
          },
        );
        logisticsList.push({
          sno: createLogisticsPayload.sno,
          tracking_status: status,
        });
        const detailPayload = [];

        for (let j = 0; j < 4; j++) {
          const locationDetail =
            locationList[Math.floor(Math.random() * locationList.length)];
          const statusDetail =
            statusList[Math.floor(Math.random() * statusList.length)];
          const createDetailPayload = {
            id: Math.floor(Math.random() * 9999).toString(),
            logistics_id: logisticsRes.id,
            date: JSON.stringify(Date.now()),
            time: JSON.stringify(Date.now()),
            status: statusDetail,
            location_id: locationDetail.id,
          };
          detailPayload.push(createDetailPayload);
        }
        await this.detail_repo.bulkCreate(detailPayload);
      }
      return { status: 'success', data: logisticsList, error: null };
    } catch (error) {
      console.log(error);
      throw new Error('Create logistics fail.');
    }
  }

  async delete() {
    try {
      await this.location_repo.destroy({
        where: {},
        truncate: true,
      });
      await this.account_repo.destroy({
        where: {},
        truncate: true,
      });
    } catch (error) {
      console.log(error);
      throw new Error('Truncate data');
    }
  }

  async init() {
    try {
      const data = await fs.readJson('src/raw/data.json');
      console.log(data.location);
      await this.location_repo.bulkCreate(data.location);
      await this.account_repo.bulkCreate(data.account);
    } catch (error) {
      console.log(error);
      throw new Error('Init data');
    }
  }
}
