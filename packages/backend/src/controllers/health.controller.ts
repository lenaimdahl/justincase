import {Controller, Get, HttpCode} from '@nestjs/common';
import {Public} from 'src/modules/auth/decorators/public.decorator';

@Controller('/api/health')
export class HealthController {
  @Get()
  @Public()
  check() {
    return {status: 'ok'};
  }
}

@Controller('/api/_health')
export class UnderscoreHealthController {
  @Get()
  @HttpCode(200)
  @Public()
  check() {}
}
