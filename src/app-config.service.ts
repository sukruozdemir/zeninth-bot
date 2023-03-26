import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppConfigService {
  static config: AppConfigService;

  constructor(private configService: ConfigService) {
    AppConfigService.config = this;
  }

  get token(): string {
    return this.configService.get('token');
  }
}
