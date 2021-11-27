import { Module } from '@nestjs/common';
import { GameSessionService } from './gamesession.service';
import { GameSessionResolver } from './gamesession.resolver';

@Module({
  providers: [GameSessionService, GameSessionResolver],
  exports: [GameSessionService],
})
export class GameSessionModule {}
