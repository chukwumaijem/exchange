import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { map } from 'rxjs';

@Injectable()
export class AppService {
  private guardianAPI: string;
  private guardianAPIKEY: string;

  constructor(
    private configService: ConfigService,
    private httpService: HttpService,
  ) {
    this.guardianAPI = this.configService.get('GUARDIAN_API');
    this.guardianAPIKEY = this.configService.get('GUARDIAN_API_KEY');
  }

  convert(currency: string): any {
    const query = `from_currency=${currency}&from_amount=${1}&to_currency=EUR`;
    const URL = `${this.guardianAPI}/estimate?${query}`;

    return this.httpService
      .get(URL, {
        headers: {
          'x-api-key': this.guardianAPIKEY,
        },
      })
      .pipe(map((response) => response?.data?.value));
  }
}
