import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  // Trigger reload
  getHello(): string {
    return 'Hello World!';
  }
}
