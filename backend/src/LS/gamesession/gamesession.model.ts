import { Field, ObjectType } from '@nestjs/graphql';
import { GSDetail } from 'src/LS/game/gamesvc.model';
import { LSUser } from 'src/LS/user/user.model';

@ObjectType()
export class GameSession {
  @Field()
  sessionid: string;

  @Field()
  creator: string;

  @Field(() => GSDetail)
  gameParameters: GSDetail;

  @Field()
  launched: boolean;

  @Field(() => [String])
  players: String[];

  @Field()
  savegameid: string;
}

@ObjectType()
export class SessionInfo {
  @Field(() => GameSession)
  gameSession: GameSession;

  @Field(() => [LSUser])
  users: LSUser[];
}
