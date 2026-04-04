import {Controller, Get, HttpCode} from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';
import {Public} from 'src/modules/auth/decorators/public.decorator';

@ApiTags('health')
@Controller('/api/health')
export class HealthController {
  @ApiOperation({summary: 'Health check'})
  @ApiResponse({description: 'Service is healthy', status: 200})
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
