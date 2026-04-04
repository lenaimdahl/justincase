import {Controller, Get, HttpCode} from '@nestjs/common';
import {Public} from 'src/modules/auth/decorators/public.decorator';

@Controller('/api/health')
export class HealthController {
  @Public()
  @Get()
  check() {
    return {status: 'ok'};
  }
}

@Controller('/api/_health')
export class UnderscoreHealthController {
  @Public()
  @Get()
  @HttpCode(200)
  check() {
    return;
  }
}
