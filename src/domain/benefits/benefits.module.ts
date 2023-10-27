import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { BenefitsController } from './benefits.controller';
import { BenefitsService } from './benefits.service';

import { Benefit, BenefitSchema } from './schemas/benefit.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Benefit.name, schema: BenefitSchema }])
  ],
  controllers: [BenefitsController],
  providers: [BenefitsService],
  exports: [BenefitsService]
})
export class BenefitsModule {}
