import { Injectable, ConsoleLogger } from '@nestjs/common';

@Injectable()
export class MyLogger extends ConsoleLogger {
  log(message: string, context: string) {
    console.log(`[${context}]`, message);
  }
}
