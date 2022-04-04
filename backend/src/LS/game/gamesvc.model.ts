import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryColumn } from 'typeorm';

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
  gamename: string;

  @Field()
  players: string[];

  @Field()
  savegameid: string;
}

@ObjectType()
@Entity()
export class GameHistory {
  @PrimaryColumn()
  gameid: string;

  @Column()
  gamedata: string;
}
