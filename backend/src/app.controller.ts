import { Body, Controller, Get, Param, Put } from '@nestjs/common';
import { AppService } from './app.service';
import { Logger } from '@nestjs/common';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Put('/api/games/:gameid')
  getHello2(@Param() params, @Body() body):string {
    Logger.log(params.gameid);
    return params.gameid;
  }
}
