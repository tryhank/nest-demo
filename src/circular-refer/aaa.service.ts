import { Injectable, forwardRef, Inject } from '@nestjs/common';
import { BbbService } from './bbb.service';

@Injectable()
export class AaaService {
  constructor(@Inject(forwardRef(() => BbbService)) private aaa: BbbService) {}
}
