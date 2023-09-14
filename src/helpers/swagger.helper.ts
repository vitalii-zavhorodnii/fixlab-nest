import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { PREFIX } from 'constants/routes.constants';

export class SwaggerHelper {
  public init(app: INestApplication) {
    const config = new DocumentBuilder()
      .setTitle('FixLab API')
      .setDescription('REST API Documentation')
      .setVersion('1.0')
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup(`${PREFIX}/docs`, app, document);
  }
}
