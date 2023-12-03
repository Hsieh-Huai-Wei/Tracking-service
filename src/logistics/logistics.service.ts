import { Injectable } from '@nestjs/common';

@Injectable()
export class LogisticsService {
  findAll() {
    return `This action returns all logistics`;
  }

  findOne(id: number) {
    return `This action returns a #${id} logistic`;
  }
}
