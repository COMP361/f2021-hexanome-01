import { Inject } from '@nestjs/common';
import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { GSDetail, SaveGame } from './gamesvc.model';
import { GameService } from './gamesvc.service';
@Resolver()
export class GameResolver {
  constructor(@Inject(GameService) private gsService: GameService) {}

  @Query(() => GSDetail!)
  async GameServiceDetail(@Args('game') game: string): Promise<GSDetail> {
    return this.gsService.getGameServiceDetail(game);
  }

  @Query(() => [SaveGame!])
  async SaveGames(@Args('game') game: string): Promise<SaveGame[]> {
    return this.gsService.getSaveGames(game);
  }

  @Query(() => SaveGame!)
  async SaveGame(
    @Args('game') game: string,
    @Args('savegameid') savegameid: string,
  ): Promise<SaveGame> {
    return this.gsService.getSaveGame(game, savegameid);
  }

  @Mutation()
  async registerSaveGame(
    @Args('game') game: string,
    @Args('savegameid') savegameid: string,
    @Args('players') players: string[],
    @Args('gamedata') gamedata: string,
  ): Promise<string> {
    return this.gsService.registerSaveGame(game, savegameid, players, gamedata);
  }

  @Mutation()
  async deleteSaveGame(
    @Args('game') game: string,
    @Args('savegameid') savegameid: string,
  ): Promise<string> {
    return this.gsService.deleteSaveGame(game, savegameid);
  }
}
