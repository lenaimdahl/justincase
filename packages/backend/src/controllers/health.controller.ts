import {Controller, Get, HttpCode} from '@nestjs/common';

@Controller('health')
export class HealthController {
  @Get()
  check() {
    return {status: 'ok'};
  }
}

@Controller('_health')
export class UnderscoreHealthController {
  @Get()
  @HttpCode(200)
  check() {
    return;
  }
}
