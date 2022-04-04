import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GameHistory } from './gamesvc.model';
import { GameResolver } from './gamesvc.resolver';
import { GameService } from './gamesvc.service';

@Module({
  imports: [TypeOrmModule.forFeature([GameHistory])],
  providers: [GameService, GameResolver],
  exports: [GameService],
})
export class GameModule {}
