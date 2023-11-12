import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

import { NotificationsService } from './notifications.service';

@Module({
  imports: [
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        transport: {
          host: config.get<string>('smtp.host'),
          port: parseInt(config.get<string>('smtp.port') || '465'),
          ignoreTLS: false,
          secure: true,
          auth: {
            user: config.get<string>('smtp.user'),
            pass: config.get<string>('smtp.password')
          }
        },
        defaults: {
          from: `"Fixlab" <${config.get<string>('smtp.user')}>`
        },
        template: {
          dir: process.cwd() + '/templates/',
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true
          }
        }
      })
    })
  ],
  providers: [NotificationsService],
  exports: [NotificationsService]
})
export class NotificationsModule {}
