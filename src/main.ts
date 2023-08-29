import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { useContainer } from 'class-validator';
import { join } from 'path';

import { AppModule } from 'domain/app.module';
import { DtoValidationPipe } from 'pipes/dto-validation.pipe';
import { SwaggerHelper } from 'helpers/swagger.helper';

(async () => {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.setGlobalPrefix('api');
  app.useGlobalPipes(new DtoValidationPipe());
  app.useStaticAssets(join(__dirname, '..', 'public'), {
    prefix: '/public',
  });

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  const swagger = new SwaggerHelper();
  swagger.init(app);

  await app.listen(process.env.PORT);
})();
