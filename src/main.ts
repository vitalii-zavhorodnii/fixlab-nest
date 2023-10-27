import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';

import { useContainer } from 'class-validator';
import { join } from 'path';

import { AppModule } from 'domain/app.module';

import { MongoErrorsFilter } from 'filters/mongo-errors.filter';
import { SwaggerHelper } from 'helpers/swagger.helper';

import { PREFIX } from 'constants/routes.constants';

(async () => {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.enableCors({
    origin: '*',
    methods: 'GET, PUT, POST, PATCH, DELETE, OPTIONS',
    credentials: true,
    allowedHeaders: ['Authorization', 'Content-Type', 'Accept', 'Range'],
    exposedHeaders: 'Content-Range'
  });

  app.setGlobalPrefix(PREFIX);

  app.useGlobalFilters(new MongoErrorsFilter());
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  app.useStaticAssets(join(__dirname, '../..', 'public'), { prefix: '/public' });

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  SwaggerHelper(app);

  await app.listen(process.env.PORT);
})();
