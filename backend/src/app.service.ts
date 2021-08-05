import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { Observable, map } from 'rxjs';

@Injectable()
export class AppService {
  private guardianAPI: string;
  private guardianAPIKEY: string;
  private logger = new Logger('App:Service');

  constructor(
    private configService: ConfigService,
    private httpService: HttpService,
  ) {
    this.guardianAPI = this.configService.get('GUARDIAN_API');
    this.guardianAPIKEY = this.configService.get('GUARDIAN_API_KEY');
  }

  convert(currency: string): Observable<AxiosResponse<any>> {
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
