import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

import { AppModule } from '../src/app.module';
import { AppService } from '../src/app.service';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  const estimate = 20.56;
  const appService = { convert: () => ({ estimate }) };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(AppService)
      .useValue(appService)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/convert (POST)', () => {
    return request(app.getHttpServer())
      .post('/convert')
      .send({ currency: 'eth' })
      .expect(/20*/gi)
      .then((resp) => {
        expect(resp.body.estimate).toBe(estimate);
      });
  });
});
