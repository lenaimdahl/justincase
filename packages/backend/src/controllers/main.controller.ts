import {Controller, Get, HttpCode} from '@nestjs/common';
import {Public} from 'src/modules/auth/decorators/public.decorator';

@Controller('')
export class MainController {
  @Get()
  @HttpCode(200)
  @Public()
  check() {}
}
