import { Inject } from '@nestjs/common';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { GameSession } from './gamesession.model';
import { GameSessionService } from './gamesession.service';

@Resolver(() => GameSession)
export class GameSessionResolver {
  constructor(
    @Inject(GameSessionService) private gameSessionService: GameSessionService
  ) {}

  @Query(() => [GameSession])
  async AllSessions(): Promise<GameSession[]> {
    return this.gameSessionService.getAllSessions();
  }

  @Mutation(() => GameSession)
  async createSession(
    @Args('creator') creator: string,
    @Args('minSessionPlayer') minSessionPlayer: number,
    @Args('maxSessionPlayer') maxSessionPlayer: number,
    @Args('displayName') displayName: string
  ) {
    return await this.gameSessionService.createSession(
      creator,
      minSessionPlayer,
      maxSessionPlayer,
      displayName,
    );
  }

  @Query(() => GameSession)
  async Session(@Args('session_id') session_id: string): Promise<GameSession> {
    return await this.gameSessionService.getSession(session_id);
  }

  @Mutation(() => GameSession)
  async LaunchSession(@Args('session_id') session_id: string): Promise<GameSession> {
    return await this.gameSessionService.launchSession(session_id);
  }



}
