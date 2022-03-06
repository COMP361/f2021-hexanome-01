import { Body, Controller, Delete, Get, Param, Put } from '@nestjs/common';
import { AppService } from './app.service';
import { Logger } from '@nestjs/common';
import GameManager from './GameServiceInstance/model/GameManager';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Put('/:service/api/games/:gameid')
  startSession(@Param() params, @Body() body): string {
    Logger.log(params.gameid);
    Logger.log(params.service);
    GameManager.getInstance().addGame(params.service, params.game_id, body);
    return body;
  }

  @Delete('/:service/api/games/:gameid')
  deleteSession(@Param() params): string {
    Logger.log(params.gameid);
    Logger.log(params.service);
    GameManager.getInstance().deleteGame(params.service, params.game_id);
    return params;
  }
}
