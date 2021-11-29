import { Inject } from '@nestjs/common';
import {
  Args,
  Resolver,
  Query,
  Mutation,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { GameSession } from 'src/gamesession/gamesession.model';
import { GameSessionService } from 'src/gamesession/gamesession.service';
import { GameUser, LSUser } from './user.model';
import { UserService } from './user.service';

@Resolver(() => LSUser)
export class UserResolver {
  constructor(
    @Inject(UserService) private userService: UserService,
    @Inject(GameSessionService) private sessionService: GameSessionService,
  ) {}

  @Query(() => LSUser)
  async LSUser(@Args('access_token') access_token: string): Promise<LSUser> {
    return await this.userService.getLSUser(access_token);
  }

  @Mutation(() => String)
  async createLSUser(
    @Args('name') name: string,
    @Args('password') password: string,
    @Args('preferredColour') preferredColour: string,
    @Args('role') role: string,
  ): Promise<string> {
    return await this.userService.createLSUser(
      name,
      password,
      preferredColour,
      role,
    );
  }

  @Mutation(() => String)
  async modifyLSUserColor(
    @Args('name') name: string,
    @Args('access_token') access_token: string,
    @Args('colour') colour: string,
  ): Promise<string> {
    return await this.userService.modifyPreferredColour(
      name,
      access_token,
      colour,
    );
  }

  @Mutation(() => String)
  async changeLSUserPassword(
    @Args('name') name: string,
    @Args('access_token') access_token: string,
    @Args('oldPassword') oldPassword: string,
    @Args('newPassword') newPassword: string,
  ): Promise<string> {
    return await this.userService.updatePassword(
      name,
      access_token,
      oldPassword,
      newPassword,
    );
  }

  @Query(() => GameUser)
  async GameUser(
    @Args('name') name: string,
    @Args('session_id') session_id: string,
  ): Promise<GameUser> {
    return await this.userService.getGameUser(name, session_id);
  }

  @Query(() => [GameUser])
  async AllGameUser(@Args('name') name: string): Promise<GameUser[]> {
    return await this.userService.getAllGameUsers(name);
  }

  @Mutation(() => GameUser)
  async createGameUser(
    @Args('name') name: string,
    @Args('session_id') session_id: string,
    @Args('color') color: string,
  ) {
    return await this.userService.createGameUser(name, session_id, color);
  }

  @Mutation(() => String)
  async deleteGameUser(
    @Args('name') name: string,
    @Args('session_id') session_id: string,
  ) {
    return await this.userService.removeGameUser(name, session_id);
  }

  @ResolveField(() => GameSession)
  async gameSession(@Parent() gameUser: GameUser): Promise<GameSession> {
    const { session_id } = gameUser;
    return await this.sessionService.getSession(session_id);
  }
}
