import { Injectable, forwardRef, Inject } from '@nestjs/common';
import { AaaService } from './aaa.service';

@Injectable()
export class BbbService {
  constructor(@Inject(forwardRef(() => AaaService)) private aaa: AaaService) {}
}
