import { DETAIL_REPOSITORY } from '../core/database/constants/index';
import { Detail } from './detail.model';

export const detailProviders = [
  {
    provide: DETAIL_REPOSITORY,
    useValue: Detail,
  },
];
