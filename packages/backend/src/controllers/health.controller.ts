import {Controller, Get, HttpCode} from '@nestjs/common';

@Controller('/api/health')
export class HealthController {
  @Get()
  check() {
    return {status: 'ok'};
  }
}

@Controller('/api/_health')
export class UnderscoreHealthController {
  @Get()
  @HttpCode(200)
  check() {
    return;
  }
}
