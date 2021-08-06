import { Controller, Body, Post } from '@nestjs/common';

import { AppService } from './app.service';

@Controller('convert')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  convert(@Body('currency') currency: string) {
    return this.appService.convert(currency);
  }
}
