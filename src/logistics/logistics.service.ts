import { Inject, Injectable } from '@nestjs/common';
import { Account, Detail, Location, Logistics, STATUS } from 'src/models';
import {
  ACCOUNT_REPOSITORY,
  DETAIL_REPOSITORY,
  LOCATION_REPOSITORY,
  LOGISTICS_REPOSITORY,
} from '../core/database/constants/index';
import { RedisClientType } from 'redis';

@Injectable()
export class LogisticsService {
  constructor(
    @Inject(ACCOUNT_REPOSITORY) private readonly account_repo: typeof Account,
    @Inject(DETAIL_REPOSITORY) private readonly detail_repo: typeof Detail,
    @Inject(LOCATION_REPOSITORY)
    private readonly location_repo: typeof Location,
    @Inject(LOGISTICS_REPOSITORY)
    private readonly logistics_repo: typeof Logistics,
    @Inject('REDIS_CLIENT')
    private redisClient: RedisClientType,
  ) {}
  async findOne(sno: number) {
    try {
      const value = await this.redisClient.get(sno.toString());
      console.log(value);
      if (value) {
        console.log(`get sno: ${sno} from Cache and return from Cache`);
        return JSON.parse(value);
      }
      console.log(`Cache not find sno: ${sno}.`);
      const logisticsRes = await this.logistics_repo.findOne({
        where: { sno },
      });
      const accountRes = await this.account_repo.findOne({
        where: { id: logisticsRes.recipient_id },
      });
      const detailRes = await this.detail_repo.findAll({
        where: { logistics_id: logisticsRes.id },
      });
      const locationList = await this.location_repo.findAll();
      if (logisticsRes) {
        const result = {
          status: 'success',
          data: {
            sno: logisticsRes.sno,
            tracking_status: logisticsRes.tracking_status,
            estimated_delivery: logisticsRes.estimated_delivery,
            details: [],
          },
          error: null,
        };
        if (detailRes && detailRes.length > 0) {
          result.data.details = detailRes.map((detail) => {
            console.log(detail);
            const targetLocation = locationList.find(
              (local) => local.id == detail.location_id,
            );
            return {
              id: detail.id,
              date: detail.date,
              time: detail.time,
              status: detail.status,
              location_id: targetLocation.id,
              location_title: targetLocation.title,
            };
          });
        }
        if (accountRes) {
          result['recipient'] = {
            id: accountRes.id,
            name: accountRes.name,
            address: accountRes.address,
            phone: accountRes.phone,
          };
        }
        if (logisticsRes.current_location_id) {
          const targetLocation = locationList.find(
            (local) => local.id === logisticsRes.current_location_id,
          );
          result['current_location'] = {
            location_id: targetLocation.id,
            title: targetLocation.title,
            city: targetLocation.city,
            address: targetLocation.address,
          };
        }
        if (
          result.data.tracking_status === STATUS.CREATED ||
          result.data.tracking_status === STATUS.IN_TRANSIT ||
          result.data.tracking_status === STATUS.PACKAGE_RECEIVED ||
          result.data.tracking_status === STATUS.OUT_OF_DELIVERY
        ) {
          console.log(
            `set sno: ${sno} to Cache. status: ${result.data.tracking_status}.`,
          );
          console.log(typeof sno);
          console.log(result);
          try {
            await this.redisClient.setEx(
              sno.toString(),
              3 * 60 * 60,
              JSON.stringify(result),
            );
          } catch (error) {
            console.log(error);
          }
        }
        console.log(result);
        return result;
      }
      return {
        status: 'error',
        data: null,
        error: {
          code: 404,
          message: 'Tracking number not found',
        },
      };
    } catch (error) {
      console.log(error);
      return {
        status: 'error',
        data: null,
        error: {
          code: 404,
          message: 'Tracking number not found',
        },
      };
    }
  }
  async report() {
    const logisticsRes = await this.logistics_repo.findAll({
      attributes: [
        'tracking_status',
        [
          this.logistics_repo.sequelize.fn(
            'COUNT',
            this.logistics_repo.sequelize.literal('*'),
          ),
          'statusCount',
        ],
      ],
      group: ['tracking_status'],
    });

    const trackingSummary = {};
    logisticsRes.forEach((log) => {
      trackingSummary[log.dataValues.tracking_status] =
        Number(log.dataValues.statusCount) || 0;
    });
    const result = {
      created_dt: Date.now(),
      trackingSummary,
    };
    return result;
  }

  async uploadReport() {
    console.log('fetch to s3');
  }
}
