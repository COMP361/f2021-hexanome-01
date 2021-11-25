import { Inject } from "@nestjs/common";
import { Resolver, Query, Mutation, Args } from "@nestjs/graphql";
import { GameSession } from "./gamesession.model";
import { GameSessionService } from "./gamesession.service";

@Resolver(of => GameSession)
export class GameSessionResolver {
    constructor(
        @Inject(GameSessionService) private gameSessionService: GameSessionService,
    ) { };

    @Query(returns => String)
    async AllSessions(): Promise<string> {
        return this.gameSessionService.getAllSessions();
    }

    @Mutation(returns => String)
    async createSession(
        @Args('access_token') access_token: string,
        @Args({
            name: 'creator',
            type: () => String,
            nullable: true
        }) creator: string,
        @Args({
            name: 'game',
            type: () => String,
            nullable: true
        }) game: string,
        @Args({
            name: 'savegame',
            type: () => String,
            nullable: true
        }) savegame: string,
    ) {
        return this.gameSessionService.createSession(access_token, creator, game, savegame);
    }

    @Query(returns => GameSession)
    async Session(@Args('session_id') session_id: string): Promise<GameSession> {
        return await this.gameSessionService.getSession(session_id);
    }

    @Mutation(returns => String)
    async joinSession(
        @Args('session_id') session_id: string,
        @Args('name') name: string,
        @Args('access_token') access_token: string
    ) {
        return await this.gameSessionService.joinSession(session_id, name, access_token);
    }

    @Mutation(returns => String)
    async exitSession(
        @Args('session_id') session_id: string,
        @Args('name') name: string,
        @Args('access_token') access_token: string
    ) {
        return await this.gameSessionService.exitSession(session_id, name, access_token);
    }

}