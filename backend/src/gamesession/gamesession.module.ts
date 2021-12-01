import { Module } from '@nestjs/common';
import { GameSessionService } from './gamesession.service';
import { GameSessionResolver } from './gamesession.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GameSession } from './gamesession.model';

@Module({
  imports: [TypeOrmModule.forFeature([GameSession])],
  providers: [GameSessionService, GameSessionResolver],
  exports: [GameSessionService],
})
export class GameSessionModule {}
