import { LOGISTICS_REPOSITORY } from 'src/core/database/constants';
import { Logistics } from './logistics.model';

export const logisticsProviders = [
  {
    provide: LOGISTICS_REPOSITORY,
    useValue: Logistics,
  },
];
