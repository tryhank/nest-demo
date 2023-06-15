import { Controller } from '@nestjs/common';
import { CircularReferService } from './circular-refer.service';

@Controller('circular-refer')
export class CircularReferController {
  constructor(private readonly circularReferService: CircularReferService) {}
}
