import { Body, Controller, Delete, Get, Param, Put } from '@nestjs/common';
import { AppService } from './app.service';
import { Logger } from '@nestjs/common';
import GameManager from './GameServiceInstance/manager/GameManager';
import GameInstance from './GameServiceInstance/GameInstance';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Put('/:service/api/games/:gameid')
  startSession(@Param() params, @Body() body): GameInstance {
    // Logger.log(params.gameid);
    // Logger.log(params.service);
    // Logger.log(body);
    return GameManager.getInstance().addGame(
      params.service,
      params.game_id,
      body,
    );
  }

  @Delete('/:service/api/games/:gameid')
  deleteSession(@Param() params): String {
    // Logger.log(params.gameid);
    // Logger.log(params.service);
    // return params;
    return GameManager.getInstance().deleteGame(params.service, params.game_id);
  }
}
