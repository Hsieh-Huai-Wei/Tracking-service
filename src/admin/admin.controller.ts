import { Controller, Get, Query } from '@nestjs/common';
import { AdminService } from './admin.service';

@Controller()
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get()
  async createLogistics(@Query('num') count: number) {
    const result = await this.adminService.create(count);
    return result;
  }

  @Get('init')
  async initData() {
    const result = await this.adminService.init();
    return result;
  }

  @Get('delete')
  async deleteData() {
    const result = await this.adminService.delete();
    return result;
  }
}
