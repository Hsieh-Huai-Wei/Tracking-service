import { Controller, Get } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

let identifyCode: string = '';
@Controller()
export class AppController {
  constructor() {}

  @Get('healthcheck')
  healthCheck(): any {
    if (identifyCode === '') {
      identifyCode = uuidv4();
    }
    return {
      health: 'ok',
      code: identifyCode,
    };
  }
}
