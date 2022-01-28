import { Field, ObjectType } from '@nestjs/graphql';

export enum GamePhase {
  ReadyToJoin = 'ReadyToJoin',
  Rounds = 'Rounds',
  Completed = 'Completed',
}

@ObjectType()
export class GSDetail {
  @Field()
  name: string;

  @Field()
  displayName: string;

  @Field()
  location: string;

  @Field()
  maxSessionPlayers: number;

  @Field()
  minSessionPlayers: number;

  @Field()
  webSupport: boolean;
}

@ObjectType()
export class SaveGame {
  @Field()
  game: GSDetail;

  @Field()
  players: string;

  @Field()
  savegameid: string;
}
