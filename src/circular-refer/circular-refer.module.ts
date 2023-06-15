import { Module } from '@nestjs/common';
import { CircularReferService } from './circular-refer.service';
import { CircularReferController } from './circular-refer.controller';
import { AaaService } from './aaa.service';
import { BbbService } from './bbb.service';

@Module({
  controllers: [CircularReferController],
  providers: [CircularReferService, AaaService, BbbService],
})
export class CircularReferModule {}
