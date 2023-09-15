import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { GadgetsController } from './gadgets.controller';
import { GadgetsService } from './gadgets.service';

import { Gadget, GadgetSchema } from './schemas/gadget.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Gadget.name, schema: GadgetSchema }])
  ],
  controllers: [GadgetsController],
  providers: [GadgetsService]
})
export class GadgetsModule {}
