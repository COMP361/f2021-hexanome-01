import { Inject } from '@nestjs/common';
import { Resolver, Query, Args } from '@nestjs/graphql';
import { GSDetail } from './gamesvc.model';
import { GameService } from './gamesvc.service';
@Resolver()
export class GameResolver {
  constructor(@Inject(GameService) private gsService: GameService) {}

  @Query(() => GSDetail!)
  async GameServiceDetail(@Args('game') game: string): Promise<GSDetail> {
    return this.gsService.getGameServiceDetail(game);
  }
}
