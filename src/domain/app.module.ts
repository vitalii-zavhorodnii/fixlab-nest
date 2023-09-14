import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthModule } from './auth/auth.module';
import { BrandsModule } from './brands/brands.module';
import { ContactsModule } from './contacts/contacts.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        uri: config.get<string>('MONGO_DB_LINK'),
        dbName: 'fixlab-db'
      })
    }),
    BrandsModule,
    UsersModule,
    AuthModule,
    ContactsModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
