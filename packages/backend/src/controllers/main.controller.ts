import {Controller, Get, HttpCode} from '@nestjs/common';
import {Public} from 'src/modules/auth/decorators/public.decorator';

@Controller('')
export class MainController {
  @Public()
  @Get()
  @HttpCode(200)
  check() {
    return;
  }
}
