import {Controller, Get, HttpCode} from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';
import {Public} from 'src/modules/auth/decorators/public.decorator';

@ApiTags('health')
@Controller('/api/health')
export class HealthController {
  @Public()
  @Get()
  @ApiOperation({summary: 'Health check'})
  @ApiResponse({status: 200, description: 'Service is healthy'})
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
