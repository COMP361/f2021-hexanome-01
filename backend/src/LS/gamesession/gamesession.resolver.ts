import { Inject } from '@nestjs/common';
<<<<<<< HEAD:backend/src/LS/gamesession/gamesession.resolver.ts
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { GameSession, SessionInfo } from './gamesession.model';
=======
import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { GameSession } from './gamesession.model';
>>>>>>> 0c169e024719dfaeee9e260250077f10cd2bcbf8:backend/src/gamesession/gamesession.resolver.ts
import { GameSessionService } from './gamesession.service';

@Resolver(() => GameSession)
export class GameSessionResolver {
  constructor(
    @Inject(GameSessionService) private gameSessionService: GameSessionService,
  ) {}

  @Query(() => [GameSession])
  async AllSessions(): Promise<GameSession[]> {
    return this.gameSessionService.getAllSessions();
  }

  @Mutation(() => SessionInfo)
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

  @Query(() => SessionInfo)
  async Session(@Args('session_id') session_id: string): Promise<SessionInfo> {
    return await this.gameSessionService.getSession(session_id);
  }

  @Mutation(() => String)
  async LaunchSession(
    @Args('session_id') session_id: string,
    @Args('access_token') access_token: string,
  ): Promise<String> {
    return await this.gameSessionService.launchSession(
      session_id,
      access_token,
    );
  }

  @Mutation(() => SessionInfo)
  async joinSession(
    @Args('session_id') session_id: string,
    @Args('name') name: string,
    @Args('access_token') access_token: string,
  ): Promise<SessionInfo> {
    return await this.gameSessionService.joinSession(
      session_id,
      name,
      access_token,
    );
  }

  @Mutation(() => String)
  async exitSession(
    @Args('session_id') session_id: string,
    @Args('name') name: string,
    @Args('access_token') access_token: string,
  ) {
    return await this.gameSessionService.exitSession(
      session_id,
      name,
      access_token,
    );
  }
}
