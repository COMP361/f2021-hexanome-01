import { Field, ObjectType } from '@nestjs/graphql';
import { GSDetail } from 'src/game/gamesvc.model';
import { LSUser } from 'src/user/user.model';

@ObjectType()
export class GameSession {
  @Field()
  creator: string;

  @Field()
  gameParameters: GSDetail;

  @Field()
  launched: boolean;

  @Field(() => [LSUser])
  players: LSUser[];

  @Field()
  savegameid: string;
}
