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

  @Mutation(returns => String)
  async registerSaveGame(
    @Args('game') game: String,
    @Args('savegameid') savegameid: String,
    @Args('players') players: String,
    @Args('gamedata') gamedata: String,
  ): Promise<String> {
    const playerList = players.split(",");
    return this.gsService.registerSaveGame(game, savegameid, playerList, gamedata);
  }

  @Mutation(returns => String)
  async deleteSaveGame(
    @Args('game') game: string,
    @Args('savegameid') savegameid: string,
  ): Promise<String> {
    return this.gsService.deleteSaveGame(game, savegameid);
  }
}
