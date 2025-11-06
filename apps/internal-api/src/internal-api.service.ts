import { Injectable } from '@nestjs/common';

@Injectable()
export class InternalApiService {
  getHello(): string {
    return 'Hello World!';
  }
}
