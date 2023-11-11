import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';

import { TrpcRouter } from '@domain/trpc/trpc.router';
import { useContainer } from 'class-validator';

import { AppModule } from '@domain/app.module';

import { MongoErrorsFilter } from '@filters/mongo-errors.filter';
import { SwaggerHelper } from '@helpers/swagger.helper';

import { PREFIX, PUBLIC_FOLDER } from '@constants/routes.constants';

(async (): Promise<void> => {
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

  app.useStaticAssets(`${process.cwd()}/${PUBLIC_FOLDER}`, {
    prefix: `/${PUBLIC_FOLDER}`
  });

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  SwaggerHelper(app);

  const trpc = app.get(TrpcRouter);
  trpc.applyMiddleware(app);

  await app.listen(process.env.PORT ?? 4000);
})();
