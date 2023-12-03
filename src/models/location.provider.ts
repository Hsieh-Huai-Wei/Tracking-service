import { LOCATION_REPOSITORY } from 'src/core/database/constants';
import { Location } from './location.model';

export const locationProviders = [
  {
    provide: LOCATION_REPOSITORY,
    useValue: Location,
  },
];
