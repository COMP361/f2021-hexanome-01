import { Inject } from '@nestjs/common';
import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { GSDetail, SaveGame } from './gamesvc.model';
import { GameService } from './gamesvc.service';
@Resolver()
export class GameResolver {
  constructor(@Inject(GameService) private gsService: GameService) {}

  @Query(() => GSDetail!)
  async GameServiceDetail(@Args('name') name: string): Promise<GSDetail> {
    return this.gsService.getGameServiceDetail(name);
  }

  @Query(() => [SaveGame])
  async SaveGames(
    @Args('name') name: string,
    @Args('access_token') access_token: string,
  ): Promise<SaveGame[]> {
    return this.gsService.getAllSaveGames(name, access_token);
  }

  @Query(() => SaveGame)
  async SaveGame(
    @Args('name') name: string,
    @Args('savegameid') savegameid: string,
    @Args('access_token') access_token: string,
  ): Promise<SaveGame> {
    return this.gsService.getSaveGame(name, savegameid, access_token);
  }

  @Mutation(() => String)
  async registerSaveGame(
    @Args('name') name: string,
    @Args('savegameid') savegameid: string,
    @Args('access_token') access_token: string,
    @Args('players') players: string,
  ): Promise<string> {
    return this.gsService.registerSaveGame(
      name,
      savegameid,
      access_token,
      players,
    );
  }
}
