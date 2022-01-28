import { Inject } from '@nestjs/common';
import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { GSDetail, SaveGame } from './gamesvc.model';
import { GameService } from './gamesvc.service';
@Resolver()
export class GameResolver {
  constructor(@Inject(GameService) private gsService: GameService) {}

  @Query(() => GSDetail!)
  async GameServiceDetail(): Promise<GSDetail> {
    return this.gsService.getGameServiceDetail();
  }

  @Query(() => [SaveGame])
  async SaveGames(
    @Args('access_token') access_token: string,
  ): Promise<SaveGame[]> {
    return this.gsService.getAllSaveGames(access_token);
  }

  @Query(() => SaveGame)
  async SaveGame(
    @Args('savegameid') savegameid: string,
    @Args('access_token') access_token: string,
  ): Promise<SaveGame> {
    return this.gsService.getSaveGame(savegameid, access_token);
  }

  @Mutation(() => String)
  async registerSaveGame(
    @Args('savegameid') savegameid: string,
    @Args('access_token') access_token: string,
    @Args('players') players: string,
  ): Promise<string> {
    return this.gsService.registerSaveGame(
      savegameid,
      access_token,
      players
    );
  }
}
