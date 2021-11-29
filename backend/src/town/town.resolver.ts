import { Inject } from '@nestjs/common';
import {
  Args,
  Resolver,
  Query,
  Mutation,
} from '@nestjs/graphql';
import { Town } from './town.model';
import { TownService } from './town.service';


@Resolver(() => Town)
export class TownResolver {
    constructor(
        @Inject(TownService) private townService: TownService,
    ){}

    @Query(() => Town)
    async Town(
        @Args('session_id') session_id: string,
        @Args('name') name: string
    ): Promise<Town> {
        return await this.townService.getTown(session_id, name);
    }

    @Query(() => [Town])
    async AllTowns(
        @Args('session_id') session_id: string
    ): Promise<Town[]> {
        return await this.townService.getTowns(session_id);
    }

    @Mutation(() => [Town])
    async createTowns(
        @Args('session_id') session_id: string,
    ): Promise<Town[]> {
        return await this.townService.createTowns(session_id);
    }

    @Mutation(() => [Town])
    async moveToNewTown(
        @Args('session_id') session_id: string,
        @Args('old_town') old_town: string,
        @Args('new_town') new_town: string,
        @Args('username') username: string
    ): Promise<Town[]> {
        return await this.townService.moveToTown(session_id, old_town, new_town, username);
    }


}