import { Inject, Injectable } from '@nestjs/common';
import { Location, Logistics } from 'src/models';
import {
  ACCOUNT_REPOSITORY,
  DETAIL_REPOSITORY,
  LOCATION_REPOSITORY,
  LOGISTICS_REPOSITORY,
} from '../core/database/constants/index';
import { Account } from '../models/account.model';
import { Detail } from '../models/detail.model';

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
        logisticsList.push(createLogisticsPayload.sno);
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
      return { sno_list: logisticsList };
    } catch (error) {
      console.log(error);
      throw new Error('Create logistics fail.');
    }
  }
}
