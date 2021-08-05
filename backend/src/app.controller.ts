import { Controller, Body, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('convert')
  convert(@Body('currency') currency: string) {
    return this.appService.convert(currency);
  }
}
