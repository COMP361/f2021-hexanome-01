import { Inject } from '@nestjs/common';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { GameSession } from './gamesession.model';
import { GameSessionService } from './gamesession.service';

@Resolver(() => GameSession)
export class GameSessionResolver {
  constructor(
    @Inject(GameSessionService) private gameSessionService: GameSessionService
  ) {}

  @Query(() => String)
  async AllSessions(): Promise<String> {
    return this.gameSessionService.getAllSessions();
  }

  // @Mutation(() => GameSession)
  // async createSession(
  //   @Args('creator') creator: string,
  //   @Args('minSessionPlayer') minSessionPlayer: number,
  //   @Args('maxSessionPlayer') maxSessionPlayer: number,
  //   @Args('displayName') displayName: string
  // ) {
  //   return await this.gameSessionService.createSession(
  //     creator,
  //     minSessionPlayer,
  //     maxSessionPlayer,
  //     displayName,
  //   );
  // }
  @Mutation(() => String)
  async createSession(
    @Args('access_token') access_token: string,
    @Args({
      name: 'creator',
      type: () => String,
      nullable: true,
    })
    creator: string,
    @Args({
      name: 'game',
      type: () => String,
      nullable: true,
    })
    game: string,
    @Args({
      name: 'savegame',
      type: () => String,
      nullable: true,
    })
    savegame: string,
  ) {
    return this.gameSessionService.createSession(
      access_token,
      creator,
      game,
      savegame,
    );
  }

  @Query(() => GameSession)
  async Session(@Args('session_id') session_id: string): Promise<GameSession> {
    return await this.gameSessionService.getSession(session_id);
  }

  // @Mutation(() => GameSession)
  // async LaunchSession(@Args('session_id') session_id: string): Promise<GameSession> {
  //   return await this.gameSessionService.launchSession(session_id);
  // }



}
