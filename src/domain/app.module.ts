import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';

import { ArticlesModule } from './articles/articles.module';
import { AuthModule } from './auth/auth.module';
import { BenefitsModule } from './benefits/benefits.module';
import { BrandsModule } from './brands/brands.module';
import { ContactsModule } from './contacts/contacts.module';
import { GadgetsModule } from './gadgets/gadgets.module';
import { ImagesModule } from './images/images.module';
import { IssuesModule } from './issues/issues.module';
import { NotificationsModule } from './notifications/notifications.module';
import { TrpcModule } from './trpc/trpc.module';
import { UsersModule } from './users/users.module';

import { STATIC_FOLDER } from '@constants/routes.constants';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ServeStaticModule.forRoot({
      rootPath: `${process.cwd()}/${STATIC_FOLDER}`
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        uri: config.get<string>('MONGO_DB_LINK'),
        dbName: config.get<string>('MONGO_DB_NAME'),
        auth: {
          username: config.get<string>('MONGO_DB_AUTH_USERNAME'),
          password: config.get<string>('MONGO_DB_AUTH_PASSWORD')
        }
      })
    }),
    TrpcModule,
    UsersModule,
    AuthModule,
    GadgetsModule,
    IssuesModule,
    BenefitsModule,
    BrandsModule,
    ContactsModule,
    ImagesModule,
    ArticlesModule,
    NotificationsModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
