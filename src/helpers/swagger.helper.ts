import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

export class SwaggerHelper {
  public init(app: INestApplication) {
    const config = new DocumentBuilder()
      .setTitle('FixLab API')
      .setDescription('REST API Documentation')
      .setVersion('1.0')
      .build();

    const document = SwaggerModule.createDocument(app, config, {
      ignoreGlobalPrefix: true,
    });
    SwaggerModule.setup('/doc', app, document);
  }
}
