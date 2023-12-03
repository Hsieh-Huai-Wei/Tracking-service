import { Controller, Post, Query } from '@nestjs/common';
import { AdminService } from './admin.service';

@Controller()
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post()
  async createLogistics(@Query('num') count: number) {
    const result = await this.adminService.create(count);
    return result;
  }
}
