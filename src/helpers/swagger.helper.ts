import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { PREFIX } from 'constants/routes.constants';
import {
  SWAGGER_DESCRIPTION,
  SWAGGER_TITLE,
  SWAGGER_VERSION
} from 'constants/swagger.constants';

export const SwaggerHelper = (app: INestApplication) => {
  const config = new DocumentBuilder()
    .setTitle(SWAGGER_TITLE)
    .setDescription(SWAGGER_DESCRIPTION)
    .setVersion(SWAGGER_VERSION)
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(`${PREFIX}/docs`, app, document, {
    customSiteTitle: `${SWAGGER_TITLE} ${SWAGGER_VERSION} - ${SWAGGER_DESCRIPTION}`
  });
};
