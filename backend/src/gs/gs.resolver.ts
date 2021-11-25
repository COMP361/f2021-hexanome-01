import { Inject } from "@nestjs/common";
import { Resolver, Query, Args, Mutation } from "@nestjs/graphql";
import { GS, GSDetail, SaveGame } from "./gs.model";
import { GSService } from "./gs.service";
@Resolver()
export class GSResolver {
    constructor(
        @Inject(GSService) private gsService: GSService
    ) {};

    @Query(returns => [GS])
    async AllGameServices(): Promise<GS[]> {
        return this.gsService.getAllGameService();
    }

    @Query(returns => GSDetail!)
    async GameServiceDetail(
        @Args('name') name: string
    ): Promise<GSDetail> {
        return this.gsService.getGameServiceDetail(name);
    }

    @Mutation(returns => String)
    async registerGameService(
        @Args('location') location: string,
        @Args('maxSessionPlayers') maxSessionPlayers: string,
        @Args('minSessionPlayers') minSessionPlayers: string,
        @Args('name') name: string,
        @Args('displayname') displayName: string,
        @Args('webSupport') webSupport: string
    ): Promise<string> {
        return this.gsService.registerGameService(location, maxSessionPlayers, minSessionPlayers, name, displayName, webSupport);
    }

    @Mutation(returns => String)
    async deleteGameService(
        @Args('name') name: string,
        @Args('access_token') access_token: string
    ): Promise<string> {
        return this.gsService.deleteGameService(name, access_token);
    }

    @Query(returns => [SaveGame])
    async SaveGames(
        @Args('name') name: string,
        @Args('access_token') access_token: string
    ): Promise<SaveGame[]> {
        return this.gsService.getAllSaveGames(name, access_token);
    }

    @Query(returns => SaveGame)
    async SaveGame(
        @Args('name') name: string,
        @Args('savegameid') savegameid: string,
        @Args('access_token') access_token: string
    ): Promise<SaveGame> {
        return this.gsService.getSaveGame(name, savegameid, access_token);
    }

    @Mutation(returns => String)
    async registerSaveGame(
        @Args('name') name: string,
        @Args('savegameid') savegameid: string,
        @Args('access_token') access_token: string,
        @Args('players') players: string
    ): Promise<String> {
        return this.gsService.registerSaveGame(name, savegameid, access_token, players);
    }


}