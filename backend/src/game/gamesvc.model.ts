import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryColumn } from 'typeorm';

export enum GamePhase {
  ReadyToJoin = "ReadyToJoin",
  Rounds = "Rounds",
  Completed = "Completed"
}

@ObjectType()
export class GS {
  @Field()
  name: string;

  @Field()
  displayName: string;
}

@ObjectType()
export class GSDetail {
  @Field()
  name: string;

  @Field()
  displayname: string;

  @Field()
  location: string;

  @Field()
  maxSessionPlayers: string;

  @Field()
  minSessionPlayers: string;

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


@ObjectType()
@Entity()
export class GameInstance {
  @PrimaryColumn()
  @Field()
  gameid: string;

  @Field()
  @Column()
  creator: string;

  @Field()
  @Column()
  savegame: string;

}