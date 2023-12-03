import { Account } from './account.model';
import { ACCOUNT_REPOSITORY } from '../core/database/constants/index';

export const accountProviders = [
  {
    provide: ACCOUNT_REPOSITORY,
    useValue: Account,
  },
];
