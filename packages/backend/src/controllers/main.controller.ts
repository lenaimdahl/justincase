import {Controller, Get, HttpCode} from '@nestjs/common';

@Controller('')
export class MainController {
  @Get()
  @HttpCode(200)
  check() {
    return;
  }
}
