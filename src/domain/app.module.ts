import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { GadgetsModule } from './gadgets/gadgets.module';
import { BrandsModule } from './brands/brands.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ContactsModule } from './contacts/contacts.module';
import { IssuesModule } from './issues/issues.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        uri: config.get<string>('MONGO_DB_LINK'),
        dbName: 'fixlab-db',
      }),
    }),
    GadgetsModule,
    BrandsModule,
    UsersModule,
    AuthModule,
    ContactsModule,
    IssuesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
